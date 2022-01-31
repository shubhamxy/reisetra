import { CartItem } from '.prisma/client'
import { CursorPaginationDTO } from 'src/core/dto'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'description'

export class GetAllCartsDTO extends CursorPaginationDTO {}

export class GetAllOffersDTO extends CursorPaginationDTO {}

export class CheckoutDTO {
    addressId: string
    billingAddressId: string
    cartId: string
    promo: string
}

export class UpdateCartItemDTO
    implements Omit<CartItem, Excluded | 'userId' | 'productId'> {
    quantity: number
    cartId: string
    orderId: string
    size: string
    color: string
}
