import { OAuthProvider, Role, User as UserModel } from '.prisma/client'

export class User implements UserModel {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }

    id: string
    email: string
    emailVerified: boolean
    name: string
    dateOfBirth: Date
    phone: string
    avatar: string
    oauthId: string
    oauthProvider: OAuthProvider
    roles: Role[]
    bio: string
    active: boolean
    createdAt: Date
    updatedAt: Date
}
