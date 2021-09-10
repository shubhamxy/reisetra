import { OAuthProvider, Role } from '.prisma/client'
import { Type } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  INVALID_PHONE,
  PASSWORD_IS_WEAK,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_REGEX,
  STRONG_PASSWORD_REGEX,
} from '@app/core'
import { User } from '../entity'

type Excluded =
  | 'id'
  | 'active'
  | 'createdAt'
  | 'updatedAt'
  | 'extra'
  | 'bio'
  | 'dateOfBirth'
  | 'phone'
  | 'inventoryId'
  | 'role'
  | 'oauthProvider'
  | 'emailVerified'
  | 'oauthId'

export class UpdateUserDTO implements Omit<User, Excluded> {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  @IsOptional()
  clientId: string

  @IsOptional()
  @IsEmail({}, { message: 'Email is invalid' })
  email: string

  @IsOptional()
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  password: string

  @IsOptional()
  @MinLength(3, { message: 'name should be min 3 chars' })
  name: string

  @IsOptional()
  @Type(() => Date)
  dateOfBirth: Date

  @IsOptional()
  @Matches(PHONE_REGEX, { message: INVALID_PHONE })
  phone: string

  @IsOptional()
  avatar: string

  oauthId: string
  oauthProvider: OAuthProvider
  role: Role
  roles: Role[]
  bio: string
}
