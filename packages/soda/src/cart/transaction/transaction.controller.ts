import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CustomException, Routes, SuccessResponse } from '@app/core'
import {
  CreateTransactionDTO,
  GetAllTransactionsDTO,
  UpdateTransactionDTO,
} from './dto'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'

@Controller(Routes.transactions)
export class TransactionController {
  constructor(private readonly txn: TransactionService) {}

  @Roles(Role.ADMIN)
  @Get(Routes.transactions_all)
  async allTransactions(
    @Query() query: GetAllTransactionsDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.txn.allTransactions(query)
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.getAllTransaction'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Get()
  async transactions(
    @Req() request: AuthenticatedRequest,
    @Query() query: GetAllTransactionsDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.txn.transactions(
        query,
        request.user.id
      )
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.getAllTransaction'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createTransaction(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateTransactionDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.txn.createTransactionFromOrderId(
        request.user.id,
        body
      )
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.createTransaction'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Get(Routes.transactions_by_transactionId)
  async getTransaction(
    @Param('transactionId') transactionId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.txn.transaction(transactionId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.getTransaction'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put(Routes.transactions_by_transactionId)
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() body: UpdateTransactionDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.txn.updateTransaction(transactionId, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.updateTransaction'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete(Routes.transactions_by_transactionId)
  async deleteTransaction(
    @Param('transactionId') transactionId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.txn.deleteTransaction(transactionId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'TransactionController.deleteTransaction'
      )
    }
  }
}
