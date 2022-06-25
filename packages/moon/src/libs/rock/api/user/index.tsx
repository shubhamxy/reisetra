import { del, get, post, put } from '../../utils/http'
import pickBy from 'lodash.pickby'
import identity from 'lodash.identity'
const queryString = require('query-string')
type Role = 'USER' | 'ADMIN'
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
    roles: Role[]
    bio: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}

export function getMe() {
    return get<Partial<UserProfile>>('user/me')
}

export function updateMe(body: Partial<UserProfile>) {
    return put<Partial<UserProfile>, Partial<UserProfile>>('user/me', body)
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
    return post<Partial<IAddress>, Partial<IAddress>>('address', body)
}

export function updateAddress({
    addressId,
    body,
}: {
    addressId: string
    body: Partial<IAddress>
}) {
    return put<Partial<IAddress>, Partial<IAddress>>(
        `address/${addressId}`,
        body
    )
}

export function deleteAddress(addressId: string) {
    return del<Partial<IAddress>>(`address/${addressId}`)
}

export function createSupportTicket(
    body: Partial<{
        subject: string
        description: string
        orderId?: string
        ticketId?: string
    }>
) {
    return post<
        Partial<{
            subject: string
            description: string
            orderId?: string
            ticketId?: string
        }>,
        Partial<{
            subject: string
            description: string
            orderId?: string
            ticketId?: string
        }>
    >('support', body)
}
