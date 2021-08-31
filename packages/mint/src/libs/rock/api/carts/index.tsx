import { del, get, post, put } from '../../utils/http'

export function getCartItem({ queryKey }: { queryKey: any }) {
    return get(`carts/${queryKey[1]}`)
}

export function cartCheckout(body) {
    return post('carts', body)
}

export function addCartItem({ cartId, productId, body }) {
    return put(`carts/${cartId}/${productId}`, body)
}

export function removeCartItem({
    cartId,
    productId,
}: {
    cartId: string
    productId: string
}) {
    return del(`carts/${cartId}/${productId}`)
}

export function getCart({ queryKey }: { queryKey: any }) {
    return get(
        `carts/${queryKey[1].cartId}${
            queryKey[1].promo ? `?promo=${queryKey[1].promo}` : ''
        }`
    )
}
