import { registerAs } from '@nestjs/config'
export interface AuthEnv {
    common: {
        throttleLimit: number
        throttleTTL: number
    }
    jwtAccessTokenOptions: {
        secret: string
        expiresIn: string
        issuer: string
        audience: string
    }
    jwtRefreshTokenOptions: {
        secret: string
        expiresIn: string
        issuer: string
        audience: string
    }
    googleOAuthOptions: {
        clientID: string
        clientSecret: string
        callbackURL: string
        scope: string[]
    }
    facebookOAuthOptions: {
        clientID: string
        clientSecret: string
        callbackURL: string
        scope: string[]
    }
}

export const auth = (): AuthEnv => ({
    common: {
        throttleLimit: +process.env.AUTH_THROTTLE_LIMIT || 3000,
        throttleTTL: +process.env.AUTH_THROTTLE_TTL || 60,
    },
    jwtAccessTokenOptions: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
    },
    jwtRefreshTokenOptions: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
    },
    googleOAuthOptions: {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CLIENT_CALLBACK_URL,
        scope: ['email', 'profile'],
    },
    facebookOAuthOptions: {
        clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_OAUTH_CLIENT_CALLBACK_URL,
        scope: ['email', 'profile'],
    },
})

export default registerAs('auth', auth)
