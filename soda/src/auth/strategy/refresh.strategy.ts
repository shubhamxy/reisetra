import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Catch, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JWT_REFRESH_TOKEN_SECRET } from 'src/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const userOrNull = await this.authService.verifyRefreshToken(payload);
    if (userOrNull) {
      return { email: userOrNull.email, id: userOrNull.sub, role: userOrNull.role };
    } else {
      return null;
    }
  }
}
