import { OAuthProvider, Role } from '@prisma/client'
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  INVALID_PHONE,
  isInvalid,
  PASSWORD_IS_WEAK,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  STRONG_PASSWORD_REGEX,
} from '@app/core'
import { User } from '../entity'

export class UpdateUserDTO implements Partial<User> {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  clientId?: string

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: isInvalid('Email') })
  email?: string

  @IsOptional()
  @IsString()
  emailVerified?: boolean

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  dateOfBirth?: Date

  @IsOptional()
  @IsBoolean()
  emailSubscribed?: boolean

  @IsOptional()
  @IsPhoneNumber('IN', { message: INVALID_PHONE })
  phone?: string

  @IsOptional()
  @IsBoolean()
  phoneSubscribed?: boolean

  @IsOptional()
  @IsBoolean()
  phoneVerified?: boolean

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsArray()
  roles?: Role[]

  @IsOptional()
  @IsString()
  bio?: string

  @IsOptional()
  @IsString()
  oauthId?: string

  @IsOptional()
  oauthProvider?: OAuthProvider

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  password?: string
}
