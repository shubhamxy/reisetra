import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { errorCodes, errorTypes } from 'src/common/codes/error';
import { Exception } from 'src/common/response';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new Exception(
        {
          message: 'Authentication Failed',
          code: errorCodes.AuthFailed,
          source: 'GoogleAuthGuard.handleRequest',
          type: errorTypes[errorCodes.AuthFailed],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
