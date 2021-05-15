import { CartItem, OrderStatus } from '.prisma/client';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { Order } from 'src/order/entity';
type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'id';


export class GetAllCartsDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;
  cursor: string;
  orderBy: string;
  orderDirection: 'desc' | 'asc';
}

export class CreateCartItemDto implements Omit<CartItem, Excluded> {
  quantity: number;
  price: number;
  cartId: string;
  productId: string;
  orderId: string;
}

export class CheckoutDto implements Omit<Order, Excluded | 'status'> {
  subTotal: number;
  itemDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  promo: string;
  discount: string;
  grandTotal: number;
  userId: string;
  addressId: string;
}

export class UpdateCartItemDto implements Omit<CartItem, Excluded | 'userId'> {
  quantity: number;
  price: number;
  cartId: string;
  productId: string;
  orderId: string;
}
