import { Injectable } from '@nestjs/common'
import { UserService } from '../users/user.service'
import { JwtService } from '@nestjs/jwt'
import {
    emailVerificationEmail,
    getEmailVerificationTokenKey,
    getForgotPasswordKey,
    getRefreshTokenKey,
    getUnsubscribeKey,
    IData,
    passwordResetEmail,
} from '../utils'
import { CacheService } from '../core/modules/cache/cache.service'
import { CreateUserDTO } from '../users/dto'
import { User } from '../users/entity'
import { UserRO } from '../users/interfaces/user.interface'
import { nanoid } from 'nanoid'
import { GoogleUser } from './strategy/google.strategy'
import { CustomError } from '../core/response'
import { errorCodes } from '../core/codes/error'
import { ConfigService } from '@nestjs/config'
import { AppEnv, AuthEnv } from 'src/core/config'
import { AuthResponse, AuthTokenPayload } from './dto/login.dto'
import { isAdmin, Role } from './decorator/roles.decorator'
import { AWSService } from '../core/modules/aws/aws.service'

@Injectable()
export class AuthService {
    private readonly appConfig
    private readonly authConfig

    constructor(
        private readonly user: UserService,
        private readonly jwt: JwtService,
        private readonly cache: CacheService,
        private readonly aws: AWSService,
        private readonly configService: ConfigService
    ) {
        this.appConfig = configService.get<AppEnv>('app')
        this.authConfig = configService.get<AuthEnv>('auth')
    }

    async validateUser(email: string, password: string): Promise<UserRO> {
        return this.user.verifyEmailPassword({ email, password })
    }

    async setRefreshToken(userId: string, tokenId: string) {
        return this.cache.set(getRefreshTokenKey(userId), tokenId)
    }

    async getRefreshToken(userId: string) {
        return this.cache.get(getRefreshTokenKey(userId))
    }

    async removeRefreshToken(userId: string) {
        return this.cache.del(getRefreshTokenKey(userId))
    }

    async isRefreshTokenPayloadValid(
        payload: AuthTokenPayload
    ): Promise<boolean> {
        const tokenId = await this.getRefreshToken(payload.sub)
        return !!(tokenId && tokenId === payload.tid)
    }

    async getAuthToken({
        id,
        email,
        roles,
    }: Partial<{
        id: string
        email: string
        roles: Role[]
    }>): Promise<AuthResponse> {
        if (!id || !email || !roles || roles.length < 1) {
            throw new CustomError(
                `Invalid Token for id:${id}, email:${email}, roles: ${roles}`,
                errorCodes.AuthFailed,
                'AuthService.getAuthToken'
            )
        }
        const tid = nanoid(5)
        const jwtAccessTokenPayload = { email, sub: id, roles: roles, tid }
        const jwtRefreshTokenPayload = { email, sub: id, roles: roles, tid }
        const accessToken = this.jwt.sign(
            jwtAccessTokenPayload,
            this.authConfig.jwtAccessTokenOptions
        )

        const refreshToken = this.jwt.sign(
            jwtRefreshTokenPayload,
            this.authConfig.jwtRefreshTokenOptions
        )

        await this.setRefreshToken(id, tid)
        return {
            id,
            email,
            roles,
            admin: isAdmin(roles),
            expires_in: this.authConfig.jwtAccessTokenOptions.expiresIn,
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer',
        }
    }

    async login(user: Partial<User>): Promise<AuthResponse> {
        return this.getAuthToken(user)
    }

    async signup(user: CreateUserDTO): Promise<AuthResponse> {
        const createdUser = await this.user.create(user)
        const authPayload = await this.getAuthToken(createdUser)
        if (createdUser) {
            if (this.appConfig.isProduction) {
                await this.sendEmailVerification(
                    createdUser.id,
                    createdUser.email
                )
            }
        }
        return authPayload
    }

    async resetPassword(data: {
        email: string
        password: string
    }): Promise<AuthResponse> {
        const updatedUser = await this.user.resetPassword(
            data.email,
            data.password
        )
        await this.cache.del(getForgotPasswordKey(data.email))
        return this.getAuthToken(updatedUser)
    }

    async updatePassword(
        email: string,
        data: {
            password: string
            oldPassword: string
        }
    ): Promise<AuthResponse> {
        const updatedUser = await this.user.updatePassword(
            email,
            data.password,
            data.oldPassword
        )
        return this.getAuthToken(updatedUser)
    }

    async googleLogin(
        user: GoogleUser,
        clientId: string
    ): Promise<AuthResponse> {
        const userOrNull = await this.user.findAndUpdateOauthAccount({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            emailVerified: user.emailVerified,
            oauthId: user.oauthId,
            oauthProvider: 'GOOGLE',
        })
        if (userOrNull) {
            return this.getAuthToken(userOrNull)
        }
        /** User does not exist on db sign them up **/
        const newUser = await this.user.createOauthAccount({
            client: clientId,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            emailVerified: user.emailVerified,
            oauthId: user.oauthId,
            oauthProvider: 'GOOGLE',
            roles: [Role.USER],
        })
        return this.getAuthToken(newUser)
    }

    async createEmailToken(id: string): Promise<string> {
        const token = nanoid(6)
        await this.cache.set(getEmailVerificationTokenKey(id), token)
        return token
    }

    async createUnsubscribeToken(email: string): Promise<string> {
        const storedToken = (await this.cache.get(
            getUnsubscribeKey(email)
        )) as string
        if (storedToken) {
            return storedToken
        }
        const token = nanoid(6)
        await this.cache.set(getUnsubscribeKey(email), token)
        return token
    }

    async verifyUnsubscribbeToken(
        email: string,
        token: string
    ): Promise<boolean> {
        const storedToken = (await this.cache.get(
            getUnsubscribeKey(email)
        )) as string
        if (!storedToken) {
            return false
        }
        return storedToken === token
    }

    async verifyEmail(id: string, token: string): Promise<boolean> {
        const storedToken = await this.cache.get(
            getEmailVerificationTokenKey(id)
        )
        if (!storedToken) {
            return false
        }
        if (storedToken === token) {
            await this.user.findAndUpdate(id, { emailVerified: true })
            await this.cache.del(getEmailVerificationTokenKey(id))
            return true
        }
        return false
    }

    async createForgottenPasswordToken(email: string): Promise<string> {
        const forgotPasswordToken = nanoid(16)
        // @TODO add time??
        await this.cache.set(getForgotPasswordKey(email), forgotPasswordToken)
        return forgotPasswordToken
    }

    async sendEmailVerification(id: string, email: string): Promise<IData> {
        const emailToken = await this.createEmailToken(id)
        return await this.aws.sendEmail(
            emailVerificationEmail(
                {
                    email,
                    token: emailToken,
                    id: id,
                },
                await this.createUnsubscribeToken(email)
            )
        )
    }

    async verifyForgotPasswordToken(
        email: string,
        token: string
    ): Promise<boolean> {
        const storedToken = (await this.cache.get(
            getForgotPasswordKey(email)
        )) as string
        if (!storedToken) {
            return false
        }
        return storedToken === token
    }

    async sendForgotPasswordEmail(email: string): Promise<IData> {
        const forgotPasswordToken = await this.createForgottenPasswordToken(
            email
        )

        if (this.appConfig.isProduction) {
            return await this.aws.sendEmail(
                passwordResetEmail(
                    {
                        email,
                        token: forgotPasswordToken,
                    },
                    await this.createUnsubscribeToken(email)
                )
            )
        }
        return { MessageId: null }
    }
}
