import { Product } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { errorCodes } from 'src/common/codes/error';
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from 'src/common/pagination';
import { CustomError } from 'src/common/response';
import { PrismaService } from 'src/common/modules/db/prisma.service';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { prismaOffsetPagination } from 'src/utils/prisma';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
  ) {}

  async getAllOrders(
    options: CursorPagination,
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
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
        model: 'order',
        include: {
          address: true,
          user: true,
        },
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.getAllOrders',
      );
    }
  }

  async getOrder(id: string): Promise<any> {
    const product = await this.db.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        address: true,
        user: true,
      }
    });
    if (!product) {
      throw new CustomError('Order does not exist', errorCodes.RecordDoesNotExist);
    }
    return product;
  }

  async createOrder(userId, data: CreateOrderDto): Promise<any> {
    try {
      const product = await this.db.order.create({
        data: {
          ...data,
          userId: userId
        },
        include: {
          address: true,
          user: true,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.createOrder',
      );
    }
  }
  async updateOrder(orderId: string, update): Promise<any> {
    try {
      const data = await this.db.order.update({
        where: { id: orderId },
        data: update,
        include: {
          address: true,
          user: true,
        }
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.updateOrder',
      );
    }
  }

  async deleteOrder(orderId: string): Promise<any> {
    try {
      const data = await this.db.order.delete({
        where: { id: orderId },
        include: {
          address: true,
          user: true,
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.deleteOrder',
      );
    }
  }
}
