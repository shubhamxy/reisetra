
import { OAuthProvider, Role, User as UserModel } from '.prisma/client';
export class User implements UserModel {
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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
