import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { CustomError, errorCodes } from '@app/core'
import { AuthEnv, Config } from '@app/config'
import { ConfigService } from '@nestjs/config'
import { UserAuthPayload } from '../auth.interface'
import { isAdmin } from '../decorator'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-strategy'
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
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
        email: payload.email,
        id: payload.sub,
        roles: payload.roles,
        isAdmin: isAdmin(payload.roles),
      }
    } else {
      throw new CustomError('Refresh token expired', errorCodes.AuthFailed)
    }
  }
}
