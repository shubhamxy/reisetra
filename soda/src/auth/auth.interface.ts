import { Role } from ".prisma/client";

export interface UserAuthPayload {
  id: string, email: string, role: Role
}

export type AuthenticatedRequest<T = {}, U = UserAuthPayload> = T & {
  user: U
};
