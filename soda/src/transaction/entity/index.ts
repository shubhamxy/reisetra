import {
  Prisma,
  Transaction as TransactionModel,
  TransactionStatus,
} from '.prisma/client';

export class Transaction implements TransactionModel {
  constructor(partial: Partial<TransactionModel>) {
    Object.assign(this, partial);
  }
  amount: number;
  id: string;
  userId: string;
  orderId: string;
  notes: Prisma.JsonValue;
  currency: string;
  receipt: string;
  paymentId: string;
  paymentOrderId: string;
  paymentSignature: string;
  reference: string;
  verified: boolean;
  type: string;
  status: TransactionStatus;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
