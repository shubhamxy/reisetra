import { OrderStatus } from '.prisma/client'
import { Allow, IsArray, IsOptional } from 'class-validator'
import { CursorPaginationDTO } from 'src/core/dto'
import { mustBeOfType } from 'src/constants'
import { File } from 'src/master/files/entity'
import { Order } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId'

export class GetAllOrdersDTO extends CursorPaginationDTO {}

export class GetAllOrdersDocumentsDTO extends CursorPaginationDTO {}

export class CreateOrderDTO implements Omit<Order, Excluded> {
    @Allow()
    subTotal: number

    @Allow()
    itemDiscount: number

    @Allow()
    tax: number

    @Allow()
    shipping: number

    @Allow()
    total: number

    @Allow()
    promo: string

    @Allow()
    discount: number

    @Allow()
    grandTotal: number

    @Allow()
    addressId: string

    @Allow()
    status: OrderStatus

    cartId: string

    @Allow()
    note: string

    @IsOptional()
    @IsArray({ message: mustBeOfType('array', 'documents') })
    documents: Omit<File, 'userId'>[]
}

export class UpdateOrderDTO implements Omit<Order, Excluded> {
    cartId: string
    @Allow()
    subTotal: number

    @Allow()
    itemDiscount: number

    @Allow()
    tax: number

    @Allow()
    shipping: number

    @Allow()
    total: number

    @Allow()
    promo: string

    @Allow()
    discount: number

    @Allow()
    grandTotal: number

    @Allow()
    addressId: string

    @Allow()
    status: OrderStatus

    @Allow()
    title: string

    @Allow()
    description: string

    @Allow()
    sendUpdate: boolean

    @IsOptional()
    @IsArray({ message: mustBeOfType('array', 'documents') })
    documents: Omit<File, 'userId'>[]
}
