import { del, get, post, put } from '../../utils/http'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'
const queryString = require('query-string')

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

interface PaginationParams {
    [key: string]: string
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'
}

export interface CreateProductDTO {
    mrp: number
    tax: number
    price: number
    published: boolean
    sizes: string[]
    dimensions?: string[]
    details?: {
        label: string
        value: string
    }[]
    colors: string[]
    brand: string
    title: string
    description: string
    inventory: {
        stockQuantity: number
        sku: string
    }
    categories?: string[]
    tags?: string[]
    images?: {
        fileType: string
        fileName: string
        url: string
        contentType: string
    }[]
}

export interface CreateCategoryDTO {
    label: string
    value: string
    styles: string[]
    images: {
        fileType: string
        fileName: string
        url: string
        contentType: string
        id: string
    }[]
}
export interface CreateBrandDTO {
    name: string
}

export interface CreateTagDTO {
    label: string
    value: string
    styles: string[]
    images: {
        fileType: string
        fileName: string
        url: string
        contentType: string
        id: string
    }[]
}

export interface CreateOfferDTO {
    label: string
    value: string
    type: string
}

export function getProduct({ queryKey }: { queryKey: any }) {
    return get(`products/${queryKey[1]}`)
}

export function getTags({ params }: { params: PaginationParams }) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`tags?${qs}`)
}

export function getBrands({ params }) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`brands?${qs}`)
}

export function getCategories({ params }: { params: PaginationParams }) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`categories?${qs}`)
}

export function getOffers({ params }: { params: PaginationParams }) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`offers?${qs}`)
}

export function createCategory(body: CreateCategoryDTO) {
    return post('categories', body)
}

export function updateCategory(body: CreateCategoryDTO) {
    return put(`categories`, body)
}

export function createBrand(body: CreateBrandDTO) {
    return post('brands', body)
}

export function createTag(body: CreateTagDTO) {
    return post('tags', body)
}
export function createOffer(body: CreateOfferDTO[]) {
    return post('offers', body)
}

export function createProduct(body: CreateProductDTO) {
    return post('products', body)
}

export function deleteProduct(id: string) {
    return del(`products/${id}`)
}

export function updateProduct({
    productId,
    body,
}: {
    productId: string
    body: CreateProductDTO
}) {
    // !!fixme
    const { brand, ...rest } = body
    return put(`products/${productId}`, rest)
}

export function getProducts(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`products?${qs}`)
}

export function getReviews({
    id,
    params,
}: {
    id: string
    params: PaginationParams
}) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`reviews/${id}?${qs}`)
}

export function createReview(body: CreateReviewDTO) {
    return post('reviews', body)
}

export function updateReview({
    id,
    body,
}: {
    id: string
    body: CreateReviewDTO
}) {
    return put(`reviews/${id}`, body)
}

export function deleteReview(id: string) {
    return del(`reviews/${id}`)
}

export function getFiles({ params }) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get(`files?${qs}`)
}
