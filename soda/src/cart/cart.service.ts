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
import { CheckoutDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
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
          id: id,
        },
        cursor: cursor || '',
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
      const data = this.db.cart.upsert({
        where: {
          id: userId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
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

  async checkoutCart(userId: string, checkout: CheckoutDto): Promise<any> {
    try {
      const data = await this.db.order.create({
        data: {
          userId,
          ...checkout,
        },
      });

      await this.db.cartItem.updateMany({
        where: {
          cartId: userId,
        },
        data: {
          cartId: { set: null },
          orderId: data.id,
        },
      });
      // await this.db.$executeRaw`
      //   UPDATE "CartItem"
      //   SET "cartId" = null, "orderId" = ${data.id}
      //   WHERE "cartId" = ${userId}
      // `

      return data;
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

  async updateCartItem(cartItemId, data): Promise<any> {
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
