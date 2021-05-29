import { CartItem, OrderStatus } from ".prisma/client";
import { CursorPaginationDTO } from "src/common/dto";
import { CursorPaginationOptionsInterface } from "src/common/pagination";
import { Order } from "src/order/entity";
type Excluded = "id" | "active" | "createdAt" | "updatedAt" | "id";

export class GetAllCartsDto extends CursorPaginationDTO {}

export class CheckoutDto {
  addressId: string;
  cartId: string;
}

export class UpdateCartItemDto implements Omit<CartItem, Excluded | "userId" | "productId"> {
  quantity: number;
  cartId: string;
  orderId: string;
  size: string;
  color: string;
}
