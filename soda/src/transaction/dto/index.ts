import { OrderStatus, Prisma, TransactionStatus } from '.prisma/client';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { Transaction } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId';

export class GetAllTransactionsDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;
  cursor: string;
  orderBy: string;
  orderDirection: 'desc' | 'asc';
}

export class CreateTransactionDto implements Omit<Transaction, Excluded> {
  notes: Prisma.JsonValue;
  amount: number;
  currency: string;
  receipt: string;
  paymentId: string;
  paymentOrderId: string;
  paymentSignature: string;
  verified: boolean;
  orderId: string;
  reference: string;
  type: string;
  status: TransactionStatus;
}

export class UpdateTransactionDto
  implements Omit<Transaction, Excluded | 'orderId'> {
  notes: Prisma.JsonValue;
  amount: number;
  currency: string;
  receipt: string;
  paymentId: string;
  paymentOrderId: string;
  paymentSignature: string;
  verified: boolean;
  reference: string;
  type: string;
  status: TransactionStatus;
}
