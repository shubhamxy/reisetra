import { User } from '.prisma/client';
import { IsEmail, isNotEmpty, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { STRONG_PASSWORD_REGEX, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, isRequired, PASSWORD_IS_WEAK } from 'src/constants';
export class CreateUserDto implements Partial<User> {
  emailVerified?: boolean;
  dateOfBirth?: Date;
  phone?: string;
  avatar?: string;
  oauthId?: string;
  oauthProvider?: 'GOOGLE';
  role?: 'USER';
  active?: boolean;

  @IsEmail({}, {message: 'Email is invalid'})
  email: string;

  @IsNotEmpty({message: isRequired('Password')})
  @MinLength(8, {message: PASSWORD_MIN_LENGTH})
  @MaxLength(20, {message: PASSWORD_MAX_LENGTH})
  @Matches(STRONG_PASSWORD_REGEX, {message: PASSWORD_IS_WEAK})
  password: string;

  @IsNotEmpty({message: isRequired('Name')})
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export class CreateOauthUserDto implements Partial<User> {
  email: string;
  emailVerified?: boolean;
  name?: string;
  dateOfBirth?: Date;
  phone?: string;
  avatar?: string;
  password?: string;
  oauthId: string;
  oauthProvider: 'GOOGLE';
  role: 'USER';
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
