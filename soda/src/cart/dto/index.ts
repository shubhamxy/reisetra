import { CartItem, OrderStatus } from ".prisma/client";
import { CursorPaginationDTO } from "src/common/dto";
import { Offer } from "../entity";
type Excluded = "id" | "active" | "createdAt" | "updatedAt" | "id";

export class GetAllCartsDto extends CursorPaginationDTO {}

export class CheckoutDto {
  addressId: string;
  cartId: string;
  promo: string;
}

export class UpdateCartItemDto implements Omit<CartItem, Excluded | "userId" | "productId"> {
  quantity: number;
  cartId: string;
  orderId: string;
  size: string;
  color: string;
}


export class CreateOfferDto {
  data: Omit<Offer, Excluded>[]
}
export class UpdateOfferDto {
  data: Omit<Offer, Excluded>[]
}

export class DeleteOfferDto {
  data: Omit<Offer, Excluded>[]
}
