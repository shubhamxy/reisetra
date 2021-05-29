import { HttpStatus, Injectable } from "@nestjs/common";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { RedisService } from "src/common/modules/redis/redis.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CartItemRO } from "./interfaces";
import { CheckoutDto, UpdateCartItemDto } from "./dto";
import { TransactionService } from "src/transaction/transaction.service";
import { CartItem, Order, Product } from ".prisma/client";
import { errorCodes } from "src/common/codes/error";

function calculateBilling(
  cartItemsWithProduct: {
    quantity: number;
    product: {
      price: number;
      tax: number;
      mrp: number;
      taxCode?: string;
    };
  }[]
) {
  let subTotal = 0;
  let tax = 0;
  let shipping = 0;
  cartItemsWithProduct.forEach((item) => {
    let itemPrice = item.quantity * item.product.price;
    subTotal += itemPrice;
    tax +=
      (Number(itemPrice) * Number(item.product.tax || 18.5)) / 100;
  });
  let total = subTotal + tax + shipping;
  let itemDiscount = (total * 20) / 100;
  let grandTotal = total - itemDiscount;

  return {
    subTotal,
    tax,
    shipping,
    itemDiscount,
    total,
    promo: "new",
    discount: 20,
    grandTotal,
  };
}
@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
    private readonly txn: TransactionService
  ) {}
  async getAllCarts(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<CartItemRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        include: {
          items: true,
        },
        model: "cart",
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "CartService.getAllCarts"
      );
    }
  }

  async getCart(
    cartId: string,
  ): Promise<any> {
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
                  images: true,
                }
              },
            }
          },
        }
      });
      if(!cart) {
        throw new CustomError(
          "Cart not found",
          errorCodes.CartNotFound,
          "UserService.getAllCarts"
        );
      }
      const billing = calculateBilling(cart.items);
      return {
        ...cart,
        ...billing,
      };
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "CartService.getAllCarts"
      );
    }
  }

  async getCartItem(cartId: string, productId: string): Promise<any> {
    try {
      const cart = await this.db.cartItem.findUnique({ where: {
        productId_cartId: {
          cartId,
          productId,
        }
      } });
      return cart;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.getCartItem"
      );
    }
  }

  async updateCart(cartId: string, productId: string, update: UpdateCartItemDto): Promise<any> {
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
                }
              }
            }
          }
        }
      })
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.addCartItem"
      );
    }
  }


  async removeCartItem(cartId: string, productId: string): Promise<any> {
    try {
      const data = await this.db.cart.update({
        where: {id: cartId},
        select: {id: true},
        data: {
          items: {
            delete: {
              productId_cartId: {
                cartId,
                productId,
              }
            }
          }
        }
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.removeCartItem"
      );
    }
  }


  async checkoutCart(
    userId: string,
    checkout: CheckoutDto
  ): Promise<
    Order & {
      razorpayOptions: Record<string, any>;
    }
  > {
    try {
      // @TODO: OPTIMIZE THIS ... too slow :(
      const userCart = await this.db.cart.findFirst({
        where: {
          AND: {
            id: checkout.cartId,
            userId: userId,
          }
        },
        select: {
          items: {
            include: {
              product: true,
            }
          },
        },
      });

      if(!userCart) {
        throw new CustomError(
          "Cart not found",
          errorCodes.CartNotFound,
          "UserService.removeCartItem"
        );
      }
      if(userCart.items.length === 0) {
        throw new CustomError(
          "Cart is empty",
          errorCodes.CartIsEmpty,
          "UserService.removeCartItem"
        );
      }
      const billing = calculateBilling(userCart.items);

      console.log({billing});
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
              createdAt: "desc",
            },
          },
        },
      });

      return this.txn.createTransaction(user);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.removeCartItem"
      );
    }
  }
}
