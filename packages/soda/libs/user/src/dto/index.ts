import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  CursorPaginationDTO,
  INVALID_PHONE,
  isInvalid,
  isRequired,
  PASSWORD_IS_WEAK,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_REGEX,
  STRONG_PASSWORD_REGEX,
} from '@app/core'
import { User } from '../entity'
import { OAuthProvider, Role } from '.prisma/client'

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
  | 'roles'
  | 'oauthProvider'
  | 'emailVerified'
  | 'oauthId'

export { LoginUserDTO } from './loginUser.dto'
export { UpdateUserDTO } from './updateUser.dto'

export class GetAllUsersDTO extends CursorPaginationDTO {
  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }
}

export class CreateUserDTO implements Omit<User, Excluded> {
  @IsOptional()
  clientId: string

  @IsEmail({}, { message: isInvalid('Email') })
  email: string

  @IsNotEmpty({ message: isRequired('Password') })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  password: string

  @IsNotEmpty({ message: isRequired('Name') })
  @MinLength(3, { message: 'name should be min 3 chars' })
  name: string

  dateOfBirth: Date

  @IsOptional()
  @Matches(PHONE_REGEX, { message: INVALID_PHONE })
  phone: string

  @IsOptional()
  @IsString()
  avatar: string

  @IsOptional()
  @IsString()
  bio: string
}

export class CreateOauthUserDTO implements Omit<User, Excluded> {
  client: string
  email: string
  emailVerified: boolean
  name: string
  dateOfBirth?: Date
  phone?: string
  avatar: string
  roles: Role[]
  bio?: string
  oauthId: string
  oauthProvider: OAuthProvider
}
