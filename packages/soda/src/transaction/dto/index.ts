import { Prisma, TransactionStatus } from '.prisma/client'
import {
    Allow,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator'
import { CursorPaginationDTO } from 'src/common/dto'
import { mustBeValidEnum } from 'src/constants'
import { Transaction } from '../entity'

type Excluded =
    | 'id'
    | 'active'
    | 'createdAt'
    | 'updatedAt'
    | 'userId'
    | 'verified'

export class GetAllTransactionsDto extends CursorPaginationDTO {}

export class CreateTransactionDto implements Omit<Transaction, Excluded> {
    @Allow()
    notes: Prisma.JsonValue

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount: number

    @IsOptional()
    @IsString()
    currency: string

    @IsOptional()
    @IsString()
    receipt: string

    @IsOptional()
    @IsString()
    paymentId: string

    @IsOptional()
    @IsString()
    paymentOrderId: string

    @IsOptional()
    @IsString()
    paymentSignature: string

    @IsOptional()
    @IsString()
    orderId: string

    @IsOptional()
    @IsString()
    reference: string

    @IsOptional()
    @IsEnum(TransactionStatus, {
        message: mustBeValidEnum(TransactionStatus, 'status'),
    })
    status: TransactionStatus

    @IsOptional()
    @IsEnum(['RAZORPAY'], { message: mustBeValidEnum(['RAZORPAY'], 'type') })
    type: 'RAZORPAY'
}

export class UpdateTransactionDto
    implements Omit<Transaction, Excluded | 'orderId'> {
    @Allow()
    notes: Prisma.JsonValue

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount: number

    @IsOptional()
    @IsString()
    currency: string

    @IsOptional()
    @IsString()
    receipt: string

    @IsOptional()
    @IsString()
    paymentId: string

    @IsOptional()
    @IsString()
    paymentOrderId: string

    @IsOptional()
    @IsString()
    paymentSignature: string

    @IsOptional()
    @IsString()
    verified: boolean

    @IsOptional()
    @IsString()
    reference: string

    @IsOptional()
    @IsEnum(TransactionStatus, {
        message: mustBeValidEnum(TransactionStatus, 'status'),
    })
    status: TransactionStatus

    @IsOptional()
    @IsEnum(['RAZORPAY'], { message: mustBeValidEnum(['RAZORPAY'], 'type') })
    type: 'RAZORPAY'
}
