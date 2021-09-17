import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { auth } from '../../core/config'
import { UserAuthPayload } from '../auth.interface'
import { isAdmin } from '../decorator/roles.decorator'

const config = auth()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtAccessTokenOptions.secret,
            issuer: config.jwtAccessTokenOptions.issuer,
            audience: config.jwtAccessTokenOptions.audience,
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
