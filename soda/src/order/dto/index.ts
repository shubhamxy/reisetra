import { OrderStatus } from '.prisma/client';
import { Allow } from 'class-validator';
import { CursorPaginationDTO } from 'src/common/dto';
import { Order } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId';

export class GetAllOrdersDto extends CursorPaginationDTO {}

export class CreateOrderDto implements Omit<Order, Excluded> {
  @Allow()
  subTotal: number;
  @Allow()
  itemDiscount: number;
  @Allow()
  tax: number;
  @Allow()
  shipping: number;
  @Allow()
  total: number;
  @Allow()
  promo: string;
  @Allow()
  discount: number;
  @Allow()
  grandTotal: number;
  @Allow()
  addressId: string;
  @Allow()
  status: OrderStatus;
}

export class UpdateOrderDto implements Omit<Order, Excluded> {
  @Allow()
  subTotal: number;
  @Allow()
  itemDiscount: number;
  @Allow()
  tax: number;
  @Allow()
  shipping: number;
  @Allow()
  total: number;
  @Allow()
  promo: string;
  @Allow()
  discount: number;
  @Allow()
  grandTotal: number;
  @Allow()
  addressId: string;
  @Allow()
  status: OrderStatus;
}
