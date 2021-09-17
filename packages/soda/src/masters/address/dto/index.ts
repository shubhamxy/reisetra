import { CursorPaginationDTO } from 'src/core/dto'
import { Address } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId'

export class AllAddressDTO extends CursorPaginationDTO {}

export class AddressesDTO extends CursorPaginationDTO {}

export class AddressDTO implements Omit<Address, Excluded> {
    state: string
    phone: string
    email: string
    fullname: string
    address: string
    region: string
    nearby: string
    zipcode: string
    city: string
    country: string
}
