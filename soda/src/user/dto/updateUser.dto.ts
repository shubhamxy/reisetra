import { OAuthProvider, Role, User } from '.prisma/client';
export class UpdateUserDto implements User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  dateOfBirth: Date;
  phone: string;
  avatar: string;
  oauthId: string;
  oauthProvider: OAuthProvider;
  role: Role;
  bio: string;

  constructor(partial:  Partial<User> ) {
    Object.assign(this, partial);
  }

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
