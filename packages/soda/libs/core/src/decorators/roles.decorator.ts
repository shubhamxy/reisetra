import { SetMetadata } from '@nestjs/common'
import { Role } from '@prisma/client'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
export const isAdmin = (roles: Role[]) =>
  roles.findIndex((role) => role === Role.ADMIN) > -1
export { Role }
