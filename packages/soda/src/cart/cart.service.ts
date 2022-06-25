import { Injectable } from '@nestjs/common'
import {
  AppError,
  CartIsEmpty,
  CartNotFound,
  CursorPagination,
  CursorPaginationResultInterface,
  EMailNotVerified,
  errorCodes,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import { CartItemRO } from './interfaces'
import { CheckoutDTO, UpdateCartItemDTO } from './dto'
import { TransactionService } from 'src/cart/transaction/transaction.service'
import { Order } from '@prisma/client'
import { UserService } from '@app/user'
import { Offer } from '@app/master'
import { ErrorHandler } from '@app/core/decorators'
import {
  CART_IS_EMPTY,
  CART_NOT_FOUND,
  DESC,
  EMAIL_NOT_VERIFIED,
  PROMO,
} from './cart.const'

function calculateBilling(
  cartItemsWithProduct: {
    quantity: number
    product: {
      price: number
      tax: number
      mrp: number
      taxCode?: string
    }
  }[],
  offer: Offer | null
) {
  let subTotal = 0
  let tax = 0
  const shipping = 0
  cartItemsWithProduct.forEach((item) => {
    const itemPrice = item.quantity * item.product.price
    subTotal += itemPrice
    tax += Math.ceil(+itemPrice * (+item.product.tax || 0.185))
  })
  const total = subTotal + tax + shipping
  const itemDiscount = offer ? (total * (+offer.value || 0)) / 100 : 0
  const grandTotal = (total - itemDiscount) | 0 // convert to int

  return {
    subTotal,
    tax: tax,
    shipping,
    itemDiscount,
    total,
    promo: offer ? offer.label : null,
    discount: (((total - grandTotal) / total) * 100) | 0,
    grandTotal,
  }
}

@Injectable()
export class CartService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService,
    private readonly txn: TransactionService,
    private readonly user: UserService
  ) {}

  @ErrorHandler()
  async getAllCarts(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<CartItemRO>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc',
    } = options
    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      include: {
        items: true,
      },
      model: 'cart',
      prisma: this.db,
    })
  }

  @ErrorHandler()
  async getCart(cartId: string, promo: string): Promise<any> {
    const cart = await this.db.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    if (!cart) {
      throw new AppError(
        'Cart not found',
        errorCodes.CartNotFound,
        'CartService.getAllCarts'
      )
    }
    const offer = promo
      ? await this.db.offer.findFirst({
          where: {
            AND: { label: promo, active: true, type: 'promo' },
          },
          rejectOnNotFound: false,
        })
      : null
    const billing = calculateBilling(cart.items, offer)
    return {
      ...cart,
      ...billing,
    }
  }

  @ErrorHandler()
  async getCartItem(cartId: string, productId: string): Promise<any> {
    return await this.db.cartItem.findUnique({
      where: {
        productId_cartId: {
          cartId,
          productId,
        },
      },
    })
  }

  @ErrorHandler()
  async updateCart(
    cartId: string,
    productId: string,
    update: UpdateCartItemDTO
  ): Promise<any> {
    return this.db.cart.update({
      where: {
        id: cartId,
      },
      include: {
        items: true,
      },
      data: {
        items: {
          upsert: {
            create: {
              productId,
              quantity: update.quantity,
              size: update.size,
              color: update.color,
            },
            update: {
              quantity: update.quantity,
              size: update.size,
              color: update.color,
            },
            where: {
              productId_cartId: {
                productId,
                cartId,
              },
            },
          },
        },
      },
    })
  }

  @ErrorHandler()
  async removeCartItem(cartId: string, productId: string): Promise<any> {
    return await this.db.cart.update({
      where: { id: cartId },
      select: { id: true },
      data: {
        items: {
          delete: {
            productId_cartId: {
              cartId,
              productId,
            },
          },
        },
      },
    })
  }

  @ErrorHandler()
  async checkoutCart(
    username: string,
    checkout: CheckoutDTO
  ): Promise<
    Order & {
      razorpayOptions: Record<string, any>
    }
  > {
    // check if email is verified
    const requestUser = await this.user.findByUsername(username)

    if (!requestUser.emailVerified) {
      throw new AppError(EMAIL_NOT_VERIFIED, EMailNotVerified)
    }

    // @TODO: OPTIMIZE THIS ... too slow :(
    const userCart = await this.db.cart.findFirst({
      where: {
        AND: {
          id: checkout.cartId,
          user: {
            username,
          },
        },
      },
      select: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!userCart) {
      throw new AppError(CART_NOT_FOUND, CartNotFound)
    }

    if (userCart.items.length === 0) {
      throw new AppError(CART_IS_EMPTY, CartIsEmpty)
    }

    const offer = checkout.promo
      ? await this.db.offer.findFirst({
          where: {
            AND: {
              label: checkout.promo,
              active: true,
              type: PROMO,
            },
          },
          rejectOnNotFound: false,
        })
      : null
    const billing = calculateBilling(userCart.items, offer)

    const user = await this.db.user.update({
      where: { username },
      data: {
        orders: {
          create: {
            ...checkout,
            ...billing,
          },
        },
      },
      include: {
        orders: {
          include: {
            address: {
              include: {
                state: true,
                country: true,
              },
            },
            transaction: true,
          },
          take: 1,
          orderBy: {
            createdAt: DESC,
          },
        },
      },
    })

    return this.txn.createTransaction(user)
  }
}
