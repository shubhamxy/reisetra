import { del, get, post, put } from '../../utils/http'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'
const queryString = require('query-string')

export interface UserProfile {
    id: string
    email: string
    emailVerified: boolean
    name: string
    dateOfBirth: Date
    phone: string
    avatar: string
    oauthId: string
    oauthProvider: 'GOOGLE'
    role: 'USER' | 'ADMIN'
    bio: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}

export function getMe() {
    return get<Partial<UserProfile>>('users')
}

export function updateMe(body: Partial<UserProfile>) {
    return put<Partial<UserProfile>, Partial<UserProfile>>('users', body)
}

interface IAddress {
    fullname: string
    address: string
    town: string
    region: string
    nearby: string
    zipcode: string
    city: string
    country: string
}

interface PaginationParams {
    [key: string]: string
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'
}

export function getAddreses(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get<Partial<IAddress[]>>(`addresses?${qs}`)
}

export function createAddress(body: Partial<IAddress>) {
    return post<Partial<IAddress>, Partial<IAddress>>('addresses', body)
}

export function updateAddress({
    addressId,
    body,
}: {
    addressId: string
    body: Partial<IAddress>
}) {
    return put<Partial<IAddress>, Partial<IAddress>>(
        `addresses/${addressId}`,
        body
    )
}

export function deleteAddress(addressId: string) {
    return del<Partial<IAddress>>(`addresses/${addressId}`)
}
