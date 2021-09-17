import { Role } from '.prisma/client'

export interface UserAuthPayload {
    id: string
    email: string
    roles: Role[]
    isAdmin: boolean
}

export type AuthenticatedRequest<
    T = Record<string, unknown>,
    U = UserAuthPayload
> = T & {
    user: U
}
