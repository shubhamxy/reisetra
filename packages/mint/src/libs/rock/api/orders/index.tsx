import { API_ROUTES, del, get, put } from '../../utils'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'

const queryString = require('query-string')

interface PaginationParams {
    [key: string]: string

    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'
}

interface IOrder {
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
    status: string
    active: boolean
    createdAt: Date
    cartId: string
    updatedAt: Date
}

export function getOrder({ queryKey }: { queryKey: any }) {
    return get(`${API_ROUTES.orders}/${queryKey[1]}`)
}

export function getOrders(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get<Partial<IOrder[]>>(`${API_ROUTES.orders}?${qs}`)
}

export function updateOrder({
    orderId,
    body,
}: {
    orderId: string
    body: Partial<IOrder>
}) {
    return put<Partial<IOrder>, Partial<IOrder>>(
        `${API_ROUTES.orders}/${orderId}`,
        body
    )
}

export function cancelOrder(orderId: string) {
    return put<Partial<IOrder>>(`${API_ROUTES.orders}/${orderId}/cancel`, {})
}

export function deleteOrder(orderId: string) {
    return del<Partial<IOrder>>(`${API_ROUTES.orders}/${orderId}`, {})
}

export function getOrderInvoice(orderId: string) {
    return get(`${API_ROUTES.orders}/${orderId}/documents`)
}
