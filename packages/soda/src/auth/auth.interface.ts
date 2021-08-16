import { Role } from ".prisma/client";

export interface UserAuthPayload {
    id: string;
    email: string;
    role: Role;
}

export type AuthenticatedRequest<
    T = Record<string, unknown>,
    U = UserAuthPayload
> = T & {
    user: U;
};
