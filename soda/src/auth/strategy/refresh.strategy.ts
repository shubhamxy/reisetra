import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { CustomError, Exception } from 'src/common/response';
import { UserAuthPayload } from '../auth.interface';
import { auth } from 'src/config';
import { errorCodes } from 'src/common/codes/error';
const config = auth();
console.log({config});

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: config.jwtRefreshTokenOptions.secret,
      issuer: config.jwtRefreshTokenOptions.issuer,
      audience: config.jwtRefreshTokenOptions.audience,
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: any): Promise<UserAuthPayload> {
    console.log({payload});
    const isValid = await this.authService.isRefreshTokenPayloadValid(payload);
    console.log({isValid});
    if (isValid) {
      return { email: payload.email, id: payload.sub, role: payload.role };
    } else {
      throw new CustomError('Refresh token expired', errorCodes.AuthFailed)
    }
  }
}
