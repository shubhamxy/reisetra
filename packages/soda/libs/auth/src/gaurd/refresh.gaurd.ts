/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  CustomException,
  errorCodes,
  ErrorTypes,
  RefreshAuthFailed,
} from '@app/core'

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-strategy') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new CustomException(
        {
          message: 'Authentication Failed',
          code: RefreshAuthFailed,
          context: JwtRefreshGuard.name,
        },
        HttpStatus.UNAUTHORIZED
      )
    }
    return user
  }
}
