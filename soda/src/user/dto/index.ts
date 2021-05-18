import {
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  STRONG_PASSWORD_REGEX,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  isRequired,
  PASSWORD_IS_WEAK,
  PHONE_REGEX,
  INVALID_PHONE,
  isInvalid,
} from 'src/constants';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { mustBeOfType, mustBe } from 'src/constants';
import { User } from '../entity';
import { OAuthProvider, Role } from '.prisma/client';
import { CursorPaginationDTO } from 'src/common/dto';

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
  | 'oauthId';

export { LoginUserDto } from './loginUser.dto';
export { UpdateUserDto } from './updateUser.dto';
export class GetAllUsersDto extends CursorPaginationDTO {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

export class CreateUserDto implements Omit<User, Excluded> {
  @IsEmail({}, { message: isInvalid('Email')})
  email: string;

  @IsNotEmpty({ message: isRequired('Password') })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  password: string;

  @IsNotEmpty({ message: isRequired('Name') })
  @MinLength(3, { message: 'name should be min 3 chars' })
  name: string;
  dateOfBirth: Date;

  @IsOptional()
  @Matches(PHONE_REGEX, { message: INVALID_PHONE })
  phone: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  bio: string;
}

export class CreateOauthUserDto implements Omit<User, Excluded> {
  email: string;
  emailVerified: boolean;
  name: string;
  dateOfBirth?: Date;
  phone?: string;
  avatar: string;
  role: Role;
  bio?: string;
  oauthId: string;
  oauthProvider: OAuthProvider;
}
