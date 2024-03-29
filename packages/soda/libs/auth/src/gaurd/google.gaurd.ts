/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthFailed, CustomException, errorCodes, ErrorTypes } from '@app/core'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new CustomException(
        {
          message: 'Authentication Failed',
          code: AuthFailed,
          context: GoogleAuthGuard.name,
        },
        HttpStatus.UNAUTHORIZED
      )
    }
    return user
  }
}
