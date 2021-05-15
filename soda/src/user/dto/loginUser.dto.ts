import { OAuthProvider, Role, User } from '.prisma/client';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto implements User{
  id: string;
  emailVerified: boolean;
  name: string;
  dateOfBirth: Date;
  phone: string;
  avatar: string;
  oauthId: string;
  oauthProvider: OAuthProvider;
  role: Role;
  bio: string;


  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor(partial:  Partial<User> ) {
    Object.assign(this, partial);
  }


  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
