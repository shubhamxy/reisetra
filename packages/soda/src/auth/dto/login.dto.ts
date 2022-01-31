import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'
import {
    STRONG_PASSWORD_REGEX,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    isRequired,
    PASSWORD_IS_WEAK,
} from '../../constants'

export class AuthUserDTO {
    @IsEmail({}, { message: 'Email is invalid' })
    readonly email: string

    @IsNotEmpty({ message: isRequired('Password') })
    readonly password: string
}

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

export class VerifyEmailDTO {
    @IsString()
    userId: string

    @IsString()
    token: string
}

export class EmailDTO {
    @IsEmail({}, { message: 'Email is invalid' })
    readonly email: string
}
