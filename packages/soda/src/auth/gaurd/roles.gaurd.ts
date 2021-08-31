import { Role } from '.prisma/client'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import config from 'src/core/config'
import { ROLES_KEY } from '../decorator/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (config.debug) {
            return true
        }

        if (!requiredRoles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        return requiredRoles.some((role) => user.role === role)
    }
}
