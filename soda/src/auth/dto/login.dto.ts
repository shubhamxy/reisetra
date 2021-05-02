import { IsEmail, isNotEmpty, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { STRONG_PASSWORD_REGEX, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, isRequired, PASSWORD_IS_WEAK } from 'src/constants';
export class AuthUserDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty({message: isRequired('Password')})
  readonly password: string;
}
