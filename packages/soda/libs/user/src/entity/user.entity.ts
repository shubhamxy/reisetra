import { OAuthProvider, Role, User as UserModel } from '@prisma/client'

export class User implements UserModel {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  id: string
  username: string | null
  email: string | null
  emailVerified: boolean
  emailSubscribed: boolean
  name: string | null
  avatar: string | null
  dateOfBirth: Date | null
  phone: string | null
  phoneVerified: boolean
  phoneSubscribed: boolean
  bio: string | null
  oauthId: string | null
  oauthProvider: OAuthProvider | null
  roles: Role[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}
