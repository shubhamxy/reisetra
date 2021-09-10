import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { auth } from '../../core/config'
import { AuthService } from '../auth.service'
import { CustomError } from 'src/core/response'
import { errorCodes } from 'src/core/codes/error'
const config = auth()
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
    constructor(private authService: AuthService) {
        super(config.googleOAuthOptions)
    }

    async validate(
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        console.log(request.body)
        // @ts-ignore
        const isValidClient = await this.authService.validateClient(request.body.clientId, request.body.redirectUri)
        if (!isValidClient) {
            throw new CustomError(
                'clientId or redirectUri is Invalid!',
                errorCodes.AuthFailed,
                'LocalStrategy.validate'
            )
        }

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
