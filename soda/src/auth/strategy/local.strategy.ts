import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User as UserModel } from '.prisma/client';
import { Exception } from 'src/common/response';
import { errorCodes, errorTypes } from 'src/common/codes/error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Partial<UserModel>> {
    const userOrNull = await this.authService.validateUser(email, password);
    if (!userOrNull) {
      throw new Exception(
        {
          code: errorCodes.LocalAuthFailed,
          source: 'LocalStrategy.validate',
          type: errorTypes[errorCodes.LocalAuthFailed],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return userOrNull;
  }
}
