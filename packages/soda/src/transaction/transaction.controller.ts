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
import { CustomException, SuccessResponse } from 'src/common/response'
import {
    CreateTransactionDto,
    GetAllTransactionsDto,
    UpdateTransactionDto,
} from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles } from 'src/auth/decorator/roles.decorator'
@Controller()
export class TransactionController {
    constructor(private readonly txn: TransactionService) {}

    @Roles('ADMIN')
    @Get('transactions')
    async allTransactions(
        @Query() query: GetAllTransactionsDto
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

    @Roles('ADMIN')
    @Get('transaction/:transactionId')
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

    @Roles('ADMIN')
    @Post('transaction')
    async createTransaction(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateTransactionDto
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

    @Roles('ADMIN')
    @Put('transaction/:transactionId')
    async updateTransaction(
        @Param('transactionId') transactionId: string,
        @Body() body: UpdateTransactionDto
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

    @Roles('ADMIN')
    @Delete('transaction/:transactionId')
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
