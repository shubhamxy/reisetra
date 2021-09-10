import { API_ROUTES, del, get, post, put } from '../../utils'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'

const queryString = require('query-string')

export function getProduct({ queryKey }: { queryKey: any }) {
    return get(`${API_ROUTES.products}/${queryKey[1]}`)
}

interface PaginationParams {
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'

    [key: string]: string
}

export function getProducts(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`${API_ROUTES.products}?${qs}`)
}

export function getRecommendations(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`${API_ROUTES.products}/recommendations?${qs}`)
}

export function getTags({ queryKey }) {
    const qs = queryString.stringify(pickBy(queryKey[1], identity))
    return get(`${API_ROUTES.tags}?${qs}`)
}

export function getBrands({ queryKey }) {
    const qs = queryString.stringify(pickBy(queryKey[1], identity))
    return get(`${API_ROUTES.brands}?${qs}`)
}

export function getCategories() {
    return get(`${API_ROUTES.categories}`)
}

export function getReviews({
    id,
    params,
}: {
    id: string
    params: PaginationParams
}) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`${API_ROUTES.reviews}/${id}?${qs}`)
}

interface CreateReviewDTO {
    title: string
    description: string
    productId: string
    images: {
        fileType: string
        fileName: string
        url: string
        contentType: string
    }[]
    tags: string[]
    rating: number
}

export function createReview(body: CreateReviewDTO) {
    return post(`${API_ROUTES.reviews}`, body)
}

export function updateReview({
    id,
    body,
}: {
    id: string
    body: CreateReviewDTO
}) {
    return put(`${API_ROUTES.reviews}/${id}`, body)
}

export function deleteReview(id: string) {
    return del(`${API_ROUTES.reviews}/${id}`)
}
