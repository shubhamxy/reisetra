import { OAuthProvider, Role } from '.prisma/client'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from '../entity'

export class LoginUserDTO implements User {
    id: string
    emailVerified: boolean
    name: string
    dateOfBirth: Date
    phone: string
    avatar: string
    oauthId: string
    oauthProvider: OAuthProvider
    role: Role
    roles: Role[]
    bio: string
    @IsOptional()
    clientId: string

    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

    active: boolean
    createdAt: Date
    updatedAt: Date
}
