import { del, get, post, put } from '../../utils/http'

export function getCartItem({ queryKey }: { queryKey: any }) {
    return get(`cart/${queryKey[1]}`)
}

export function addCartItem({ cartId, productId, body }) {
    return put(`cart/${cartId}/${productId}`, body)
}

export function removeCartItem({
    cartId,
    productId,
}: {
    cartId: string
    productId: string
}) {
    return del(`cart/${cartId}/${productId}`)
}

interface PaginationParams {
    [key: string]: string
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'
}

export function getCart({ queryKey }: { queryKey: any }) {
    return get(
        `cart/${queryKey[1].cartId}${
            queryKey[1].promo ? `?promo=${queryKey[1].promo}` : ''
        }`
    )
}

export function cartCheckout(body) {
    return post('cart/checkout', body)
}
