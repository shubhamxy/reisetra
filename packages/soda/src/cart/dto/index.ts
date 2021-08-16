import { CartItem } from ".prisma/client";
import { CursorPaginationDTO } from "src/common/dto";
import { Offer } from "../entity";
type Excluded = "id" | "active" | "createdAt" | "updatedAt" | "id";

export class GetAllCartsDto extends CursorPaginationDTO {}

export class GetAllOffersDto extends CursorPaginationDTO {}

export class CheckoutDto {
    addressId: string;
    cartId: string;
    promo: string;
}

export class UpdateCartItemDto
    implements Omit<CartItem, Excluded | "userId" | "productId"> {
    quantity: number;
    cartId: string;
    orderId: string;
    size: string;
    color: string;
}

export class CreateOfferDto implements Omit<Offer, Excluded> {
    label: string;
    value: string;
    type: string;
    description: string;
}
export class UpdateOfferDto implements Omit<Offer, Excluded> {
    label: string;
    value: string;
    type: string;
    description: string;
}

export class DeleteOfferDto implements Omit<Offer, Excluded | "description"> {
    label: string;
    value: string;
    type: string;
}
