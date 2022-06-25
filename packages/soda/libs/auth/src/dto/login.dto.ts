import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  INVALID_PHONE,
  isRequired,
  PASSWORD_IS_WEAK,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  STRONG_PASSWORD_REGEX,
} from '@app/core'
import { Role } from '@prisma/client'
import { EMAIL_IS_INVALID } from '@app/auth/auth.const'

export class ResetPasswordDTO {
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string

  @IsNotEmpty({ message: isRequired('Password') })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  readonly password: string

  readonly token: string
}

export class UpdatePasswordDTO {
  @IsNotEmpty({ message: isRequired('Password') })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  readonly password: string

  readonly oldPassword: string
}

export class LoginPhoneOTPDTO {
  @IsString()
  @IsOptional()
  readonly redirectUri: string

  @IsString()
  @IsOptional()
  readonly clientId: string

  @IsPhoneNumber('IN', { message: INVALID_PHONE })
  readonly phone: string
}

export class LoginPhoneDTO {
  redirectUri?: string

  clientId?: string

  phone: string

  @IsNotEmpty({ message: isRequired('Otp') })
  otp: string

  email?: string

  password?: string

  name?: string

  dateOfBirth?: Date

  avatar?: string

  @IsOptional()
  @IsString()
  bio?: string

  emailSubscribed?: boolean

  phoneSubscribed?: boolean

  phoneVerified?: boolean

  username?: string
}

export class VerifyEmailDTO {
  @IsString()
  username: string

  @IsString()
  token: string
}

export class ResetEmailDTO {
  @IsEmail({}, { message: EMAIL_IS_INVALID })
  email: string

  @IsString()
  token: string
}

export class EmailDTO {
  @IsEmail({}, { message: EMAIL_IS_INVALID })
  readonly email: string
}

export interface AuthTokenPayload {
  tid: string
  sub: string
  username: string
  role: string
}

export interface AuthResponse {
  id: string
  username: string
  roles: Role[]
  admin: boolean
  expires_in: string
  access_token: string
  refresh_token: string
  token_type: string
}
