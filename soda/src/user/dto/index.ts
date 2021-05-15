import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsEmail,
  isNotEmpty,
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
} from 'src/constants';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { mustBeOfType, mustBe } from 'src/constants';
import { User } from '../entity';
import { OAuthProvider, Role } from '.prisma/client';

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
export class GetAllUsersDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'cursor') })
  cursor: string;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'orderBy') })
  orderBy: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'], { message: mustBe('desc or asc', 'orderDirection') })
  orderDirection: 'asc' | 'desc';
}

export class CreateUserDto implements Omit<User, Excluded> {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
  @IsNotEmpty({ message: isRequired('Password') })
  @MinLength(8, { message: PASSWORD_MIN_LENGTH })
  @MaxLength(20, { message: PASSWORD_MAX_LENGTH })
  @Matches(STRONG_PASSWORD_REGEX, { message: PASSWORD_IS_WEAK })
  password: string;
  @IsNotEmpty({ message: isRequired('Name') })
  name: string;
  dateOfBirth: Date;
  phone: string;
  avatar: string;
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
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
