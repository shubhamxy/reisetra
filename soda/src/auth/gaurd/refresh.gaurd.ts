import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { errorCodes, errorTypes } from 'src/common/codes/error';
import { Exception } from 'src/common/response';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new Exception(
        {
          message: 'Authentication Failed',
          code: errorCodes.RefreshAuthFailed,
          source: 'JwtRefreshGuard.handleRequest',
          type: errorTypes[errorCodes.RefreshAuthFailed],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}