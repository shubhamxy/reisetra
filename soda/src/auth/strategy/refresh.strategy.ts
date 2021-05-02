import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JWT_REFRESH_TOKEN_SECRET } from 'src/config';
import { AuthService } from '../auth.service';
import { errorResponse } from 'src/common/response/error';
import { BAD_REQUEST } from 'src/constants';
import { BadRequestException } from 'src/common/response/exeptions';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request.headers['x-refresh-token'] as string;
      }]),
      secretOrKey: JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.headers['x-refresh-token'] as string;
    const user = await this.authService.verifyRefreshToken(payload, refreshToken);
    if (user) {
      return {email: user.email, id: user.sub, role: user.role};
    } else {
      throw BadRequestException('Refresh token is expired or invalid');
    }
  }
}
