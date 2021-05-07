import { User as UserModel } from '@prisma/client';

export type UserRO = Partial<UserModel>;

export type UsersRO = Partial<UserModel>[]
