import { API_ROUTES, del, get, post, put } from '../../utils'
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

type ITicket = Partial<{
    subject: string
    description: string
    orderId?: string
    ticketId?: string
}>

export function getMe() {
    return get<Partial<UserProfile>>(API_ROUTES.users)
}

export function updateMe(body: Partial<UserProfile>) {
    return put<Partial<UserProfile>, Partial<UserProfile>>(
        API_ROUTES.users,
        body
    )
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
    size?: string
    buttonNum?: string
    cursor?: string
    orderBy?: string
    orderDirection?: 'desc' | 'asc'

    [key: string]: string
}

export function getAddresses(params: PaginationParams) {
    const qs = queryString.stringify(pickBy(params, identity))
    return get<Partial<IAddress[]>>(`${API_ROUTES.addresses}?${qs}`)
}

export function createAddress(body: Partial<IAddress>) {
    return post<Partial<IAddress>, Partial<IAddress>>(
        API_ROUTES.addresses,
        body
    )
}

export function updateAddress({
    addressId,
    body,
}: {
    addressId: string
    body: Partial<IAddress>
}) {
    return put<Partial<IAddress>, Partial<IAddress>>(
        `${API_ROUTES.addresses}/${addressId}`,
        body
    )
}

export function deleteAddress(addressId: string) {
    return del<Partial<IAddress>>(`${API_ROUTES.addresses}/${addressId}`)
}

export function createSupportTicket(body: ITicket) {
    return post<ITicket, ITicket>(API_ROUTES.supports, body)
}
