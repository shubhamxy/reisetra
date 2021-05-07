
import { User } from '.prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  role: 'USER';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  emailVerified: boolean;
  avatar: string;
  oauthId: string;
  oauthProvider: 'GOOGLE';
}
