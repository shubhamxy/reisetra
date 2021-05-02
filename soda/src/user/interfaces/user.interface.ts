import { User as UserModel } from '@prisma/client';

export interface UserRO {
  user: Partial<UserModel>;
}
