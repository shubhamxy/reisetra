import { Order as OrderModel, OrderStatus } from '.prisma/client'

export class Order implements OrderModel {
    constructor(partial: Partial<OrderModel>) {
        Object.assign(this, partial)
    }

    id: string
    subTotal: number
    itemDiscount: number
    tax: number
    shipping: number
    total: number
    promo: string
    discount: number
    grandTotal: number
    userId: string
    addressId: string
    billingAddressId: string
    status: OrderStatus
    active: boolean
    createdAt: Date
    cartId: string
    updatedAt: Date
}
