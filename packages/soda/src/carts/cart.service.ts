import { Injectable } from '@nestjs/common'
import {
    CursorPagination,
    CursorPaginationResultInterface,
} from 'src/core/pagination'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { CacheService } from 'src/core/modules/cache/cache.service'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { CartItemRO } from './interfaces'
import { CheckoutDTO, UpdateCartItemDTO } from './dto'
import { TransactionService } from 'src/carts/transaction/transaction.service'
import { Order } from '.prisma/client'
import { errorCodes } from 'src/core/codes/error'
import { UserService } from 'src/users/user.service'
import { Offer } from 'src/masters/offer/entity'

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
        private readonly db: PrismaService,
        private readonly cache: CacheService,
        private readonly txn: TransactionService,
        private readonly user: UserService
    ) {}

    async getAllCarts(
        options: CursorPagination
    ): Promise<CursorPaginationResultInterface<CartItemRO>> {
        try {
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = 'desc',
            } = options
            const result = await prismaOffsetPagination({
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
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.getAllCarts'
            )
        }
    }

    async getCart(cartId: string, promo: string): Promise<any> {
        try {
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
                throw new CustomError(
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
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.getAllCarts'
            )
        }
    }

    async getCartItem(cartId: string, productId: string): Promise<any> {
        try {
            const cart = await this.db.cartItem.findUnique({
                where: {
                    productId_cartId: {
                        cartId,
                        productId,
                    },
                },
            })
            return cart
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.getCartItem'
            )
        }
    }

    async updateCart(
        cartId: string,
        productId: string,
        update: UpdateCartItemDTO
    ): Promise<any> {
        try {
            const data = this.db.cart.update({
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
            return data
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.addCartItem'
            )
        }
    }

    async removeCartItem(cartId: string, productId: string): Promise<any> {
        try {
            const data = await this.db.cart.update({
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
            return data
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.removeCartItem'
            )
        }
    }

    async checkoutCart(
        userId: string,
        checkout: CheckoutDTO
    ): Promise<
        Order & {
            razorpayOptions: Record<string, any>
        }
    > {
        try {
            // check if email is verified
            const requestUser = await this.user.find(userId)

            if (!requestUser.emailVerified) {
                throw new CustomError(
                    'Email not verified, Verify email before checking out.',
                    errorCodes.EMailNotVerified,
                    'CartService.checkoutCart'
                )
            }

            // @TODO: OPTIMIZE THIS ... too slow :(
            const userCart = await this.db.cart.findFirst({
                where: {
                    AND: {
                        id: checkout.cartId,
                        userId: userId,
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
                throw new CustomError(
                    'Cart not found',
                    errorCodes.CartNotFound,
                    'CartService.removeCartItem'
                )
            }

            if (userCart.items.length === 0) {
                throw new CustomError(
                    'Cart is empty',
                    errorCodes.CartIsEmpty,
                    'CartService.removeCartItem'
                )
            }

            const offer = checkout.promo
                ? await this.db.offer.findFirst({
                      where: {
                          AND: {
                              label: checkout.promo,
                              active: true,
                              type: 'promo',
                          },
                      },
                      rejectOnNotFound: false,
                  })
                : null
            const billing = calculateBilling(userCart.items, offer)

            const user = await this.db.user.update({
                where: { id: userId },
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
                            address: true,
                            transaction: true,
                        },
                        take: 1,
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
            })

            return this.txn.createTransaction(user)
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'CartService.removeCartItem'
            )
        }
    }
}
