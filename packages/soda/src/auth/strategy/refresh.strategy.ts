import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from '../auth.service'
import { CustomError } from 'src/core/response'
import { UserAuthPayload } from '../auth.interface'
import { auth } from 'src/core/config'
import { errorCodes } from 'src/core/codes/error'
import { isAdmin } from '../decorator/roles.decorator'

const config = auth()

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
            secretOrKey: config.jwtRefreshTokenOptions.secret,
            issuer: config.jwtRefreshTokenOptions.issuer,
            audience: config.jwtRefreshTokenOptions.audience,
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
            throw new CustomError(
                'Refresh token expired',
                errorCodes.AuthFailed
            )
        }
    }
}
