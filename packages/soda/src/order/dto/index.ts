import { OrderStatus } from '.prisma/client'
import { Allow, IsArray, IsOptional } from 'class-validator'
import { CursorPaginationDTO, mustBeOfType } from '@app/core'
import { File } from 'src/master/file/entity'
import { Order } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId'

export class GetAllOrdersDTO extends CursorPaginationDTO {}

export class GetAllOrdersDocumentsDTO extends CursorPaginationDTO {}

export class OrderDTO implements Omit<Order, Excluded> {
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
  billingAddressId: string

  @Allow()
  status: OrderStatus

  @Allow()
  cartId: string

  @Allow()
  note: string

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
