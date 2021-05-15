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
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { Transaction } from './entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
  ) {}

  async allTransactions(
    options: CursorPagination,
  ): Promise<CursorPaginationResultInterface<Partial<Transaction>>> {
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
        model: 'transaction',
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'TransactionService.allTransactions',
      );
    }
  }

  async transaction(transactionId: string): Promise<Transaction> {
    const product = await this.db.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!product) {
      throw new CustomError(
        'Transaction does not exist',
        errorCodes.RecordDoesNotExist,
      );
    }
    return product;
  }

  async createTransaction(userId: string, data: CreateTransactionDto): Promise<Transaction> {
    try {
      const product = await this.db.transaction.create({
        data: {
          userId,
          orderId: data.orderId,
          amount: data.amount,
          type: data.type,
          status: data.status,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'TransactionService.createTransaction',
      );
    }
  }

  async updateTransaction(transactionId: string, update: UpdateTransactionDto): Promise<Transaction> {
    try {
      const data = await this.db.transaction.update({
        where: { id: transactionId },
        data: update,
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'TransactionService.updateTransaction',
      );
    }
  }

  async deleteTransaction(transactionId: string): Promise<Transaction> {
    try {
      const data = await this.db.transaction.delete({
        where: { id: transactionId },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'TransactionService.deleteTransaction',
      );
    }
  }
}
