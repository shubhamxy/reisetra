import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthEnv, Config } from '@app/config'
import { UserAuthPayload } from '../auth.interface'
import { isAdmin } from '../decorator'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthEnv>(Config.auth).jwtAccessTokenOptions
        .secret,
      issuer: configService.get<AuthEnv>(Config.auth).jwtAccessTokenOptions
        .issuer,
      audience: configService.get<AuthEnv>(Config.auth).jwtAccessTokenOptions
        .audience,
      ignoreExpiration: false,
      passReqToCallback: true,
    })
  }

  async validate(request: Request, payload): Promise<UserAuthPayload> {
    return {
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
      isAdmin: isAdmin(payload.roles),
    }
  }
}
