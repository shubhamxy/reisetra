import { CursorPaginationDTO } from 'src/core/dto'
import { Offer } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'description'
export class GetAllOffersDTO extends CursorPaginationDTO {}
export class CreateOfferDTO implements Omit<Offer, Excluded> {
    label: string
    value: string
    type: string
    description: string
}
export class UpdateOfferDTO implements Omit<Offer, Excluded> {
    label: string
    value: string
    type: string
    description: string
}

export class DeleteOfferDTO implements Omit<Offer, Excluded> {
    label: string
    value: string
    type: string
}
