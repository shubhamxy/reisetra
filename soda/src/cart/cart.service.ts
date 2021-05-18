import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from 'src/common/pagination';
import { CustomError } from 'src/common/response';
import { PrismaService } from 'src/common/modules/db/prisma.service';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { prismaOffsetPagination } from 'src/utils/prisma';
import { CartItemRO } from './interfaces';
import { CheckoutDto, UpdateCartItemDto } from './dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { CartItem, Order, Product } from '.prisma/client';

function calculateBilling(
  cartItemsWithProduct: {
    quantity: number;
    product: {
      price: number;
      tax: number;
    };
  }[],
) {
  let subTotal = 0;
  let tax = 0;
  let shipping = 100;
  cartItemsWithProduct.forEach((item) => {
    let itemPrice = item.quantity * item.product.price;
    subTotal += itemPrice;
    tax +=
      (Number(itemPrice) *
        Number(item.product.price) *
        Number(item.product.tax || 18.5)) /
      100;
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
    promo: 'new',
    discount: 20,
    grandTotal,
  };
}
@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
    private readonly txn: TransactionService,
  ) {}
  async getAllCarts(
    options: CursorPagination,
  ): Promise<CursorPaginationResultInterface<CartItemRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        include: {
          cartItems: true,
        },
        model: 'cart',
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.getAllCarts',
      );
    }
  }

  async getUserCart(
    id,
    options: CursorPagination,
  ): Promise<CursorPaginationResultInterface<CartItemRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options;
      const result = await prismaOffsetPagination({
        where: {
          cartId: id,
        },
        cursor: cursor || '',
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        include: {
          product: true,
        },
        model: 'cartItem',
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.getAllCarts',
      );
    }
  }

  async getCartItem(id: string): Promise<any> {
    try {
      const cart = await this.db.cartItem.findUnique({ where: { id } });
      return cart;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.getCartItem',
      );
    }
  }

  async addCartItem(userId: string, productId: string, quantity): Promise<any> {
    try {
      const data = this.db.user.update({
        where: { id: userId },
        select: {
          cart: {
            include: {
              cartItems: true,
            },
          },
        },
        data: {
          cart: {
            upsert: {
              create: {
                cartItems: {
                  create: {
                    quantity,
                    productId,
                  },
                },
              },
              update: {
                cartItems: {
                  create: {
                    quantity,
                    productId,
                  },
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.addCartItem',
      );
    }
  }

  async checkoutCart(
    userId: string,
    checkout: CheckoutDto,
  ): Promise<
    Order & {
      razorpayOptions: Record<string, any>;
    }
  > {
    try {
      // @TODO: OPTIMIZE THIS ... too slow :(
      const cartItemsWithProduct = await this.db.cartItem.findMany({
        where: {
          cartId: userId,
        },
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
              tax: true,
              mrp: true,
            },
          },
        },
      });

      const billing = calculateBilling(cartItemsWithProduct);
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
      });

      await this.db.cartItem.updateMany({
        where: {
          cartId: userId,
        },
        data: {
          cartId: { set: null },
          orderId: user.orders[0].id,
        },
      });
      return this.txn.createTransaction(user);
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.removeCartItem',
      );
    }
  }

  async removeCartItem(cartItemId: string): Promise<any> {
    try {
      const data = await this.db.cartItem.delete({
        where: { id: cartItemId },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.removeCartItem',
      );
    }
  }

  async updateCartItem(
    cartItemId: string,
    data: UpdateCartItemDto,
  ): Promise<any> {
    try {
      const updated = await this.db.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: data,
      });
      return updated;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.updateCartItem',
      );
    }
  }
}
