import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AppError, errorCodes } from '@app/core'
import { AuthEnv, Config } from '@app/config'
import { ConfigService } from '@nestjs/config'
import { UserAuthPayload } from '../auth.interface'
import { isAdmin } from '../decorator'
import { AuthService } from '../auth.service'
import {
  JWT_REFRESH_STRATEGY_NAME,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_HEADER_KEY,
} from '../auth.const'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY_NAME
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(REFRESH_TOKEN_HEADER_KEY),
      secretOrKey: configService.get<AuthEnv>(Config.auth)
        .jwtRefreshTokenOptions.secret,
      issuer: configService.get<AuthEnv>(Config.auth).jwtRefreshTokenOptions
        .issuer,
      audience: configService.get<AuthEnv>(Config.auth).jwtRefreshTokenOptions
        .audience,
      passReqToCallback: true,
      ignoreExpiration: false,
    })
  }

  async validate(request: Request, payload: any): Promise<UserAuthPayload> {
    if (await this.authService.isRefreshTokenPayloadValid(payload)) {
      return {
        username: payload.username,
        // email: payload.email,
        id: payload.sub,
        roles: payload.roles,
        isAdmin: isAdmin(payload.roles),
      }
    } else {
      throw new AppError(REFRESH_TOKEN_EXPIRED, errorCodes.AuthFailed)
    }
  }
}
