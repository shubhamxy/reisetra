import { OrderStatus, Prisma } from '.prisma/client';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { Order } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId';

export class GetAllOrdersDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;
  cursor: string;
  orderBy: string;
  orderDirection: 'desc' | 'asc';
}

export class CreateOrderDto implements Omit<Order, Excluded> {
  subTotal: number;
  itemDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promo: string;
  discount: string;
  grandTotal: number;
  addressId: string;
  status: OrderStatus;
}

export class UpdateOrderDto implements Omit<Order, Excluded> {
  subTotal: number;
  itemDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promo: string;
  discount: string;
  grandTotal: number;
  addressId: string;
  status: OrderStatus;
}
