import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthEnv, Config } from '@app/config'

export interface GoogleUser {
  oauthId: string
  email: string
  emailVerified: boolean
  name: string
  avatar?: string
  accessToken?: string
  refreshToken?: string
  oauthProvider: string
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super(config.get<AuthEnv>(Config.auth).googleOAuthOptions)
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, displayName, name, emails, photos, provider } = profile
    const user: GoogleUser = {
      oauthId: id,
      email: emails[0].value,
      emailVerified: emails[0].verified,
      name: displayName || `${name.givenName} ${name.familyName}`.trim(),
      avatar: photos[0].value,
      accessToken,
      refreshToken,
      oauthProvider: String(provider).toUpperCase(),
    }
    done(null, user)
  }
}
