import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import {
  STRONG_PASSWORD_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  isRequired,
  PASSWORD_IS_WEAK,
} from "../../constants";
export class AuthUserDto {
  @IsEmail({}, { message: "Email is invalid" })
  readonly email: string;
  @IsNotEmpty({ message: isRequired("Password") })
  readonly password: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: "Email is invalid" })
  readonly email: string;
  @IsNotEmpty({ message: isRequired("Password") })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  readonly password: string;
  readonly token: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty({ message: isRequired("Password") })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  readonly password: string;
  readonly oldPassword: string;
}

export class VerifyEmailParams {
  @IsString()
  id: string;
  @IsString()
  token: string;
}

export class EmailParams {
  @IsEmail({}, { message: "Email is invalid" })
  readonly email: string;
}
