import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_LOCAL_AUTHENTICATED, IS_PUBLIC_KEY } from '@app/auth'
import { AuthFailed, CustomException, errorCodes, ErrorTypes } from '@app/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    const isLocalAuthenticated = this.reflector.getAllAndOverride<boolean>(
      IS_LOCAL_AUTHENTICATED,
      [context.getHandler(), context.getClass()]
    )
    if (isLocalAuthenticated) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new CustomException(
        {
          message: 'Authentication Failed',
          code: AuthFailed,
          context: JwtAuthGuard.name,
        },
        HttpStatus.UNAUTHORIZED
      )
    }
    return user
  }
}
