import { Injectable } from '@nestjs/common'
import { User, UserDTO, UserRO, UserService } from '@app/user'
import { JwtService } from '@nestjs/jwt'
import {
  GET_EMAIL_VERIFICATION_TOKEN_KEY,
  GET_FORGOT_PASSWORD_TOKEN_KEY,
  GET_PHONE_VERIFICATION_OTP_KEY,
  GET_REFRESH_TOKEN_KEY,
} from '@app/utils'
import { CacheService } from '@app/cache'
import { customAlphabet, nanoid } from 'nanoid'
import { GoogleUser } from './strategy'
import { AppError, AuthFailed, RecordToUpdateNotFound } from '@app/core'
import { ConfigService } from '@nestjs/config'
import { AppEnv, AuthEnv, Config } from '@app/config'
import {
  AuthResponse,
  AuthTokenPayload,
  LoginPhoneDTO,
  LoginPhoneOTPDTO,
} from './dto'
import { isAdmin, Role } from '@app/core/decorators/roles.decorator'
import { AWSService, SESMailRTO, TemplateService } from '@app/aws'
import { LogParams } from '@app/auth/decorator'
import { PublishResponse } from 'aws-sdk/clients/sns'
import { DbService } from '@app/db'
import {
  BEARER,
  INVALID_TOKEN_FOR,
  OTP_ALPHABETS,
  OTP_SMS_MESSAGE,
} from '@app/auth/auth.const'
import { OAuthProvider } from '@prisma/client'

@Injectable()
export class AuthService {
  private readonly appConfig
  private readonly authConfig

  constructor(
    private readonly db: DbService,
    private readonly user: UserService,
    private readonly jwt: JwtService,
    private readonly cache: CacheService,
    private readonly aws: AWSService,
    private readonly template: TemplateService,
    private readonly configService: ConfigService
  ) {
    this.appConfig = configService.get<AppEnv>(Config.app)
    this.authConfig = configService.get<AuthEnv>(Config.auth)
  }

  @LogParams()
  async validateUser(email: string, password: string): Promise<UserRO> {
    return this.user.verifyEmailPassword({ email, password })
  }

  async isRefreshTokenPayloadValid(
    payload: AuthTokenPayload
  ): Promise<boolean> {
    const tokenId = await this.getRefreshToken(payload.sub)
    return !!(tokenId && tokenId === payload.tid)
  }

  async login(user: Partial<User>): Promise<AuthResponse> {
    return this.getAuthToken(user)
  }

  async createPhoneOTP(id: string): Promise<string> {
    const otp = customAlphabet(OTP_ALPHABETS, 6)()
    await this.cache.set(GET_PHONE_VERIFICATION_OTP_KEY(id), otp)
    return otp
  }

  async loginPhone(data: LoginPhoneDTO): Promise<AuthResponse> {
    const user = await this.verifyPhoneOTP(data)
    if (user) {
      return this.getAuthToken(user)
    }
    return null
  }

  @LogParams()
  async sendPhoneOTP(data: LoginPhoneOTPDTO): Promise<PublishResponse> {
    const otp = await this.createPhoneOTP(data.phone)
    return await this.aws.sendSMS(
      {
        PhoneNumber: data.phone,
        Message: OTP_SMS_MESSAGE(otp),
      },
      false
    )
  }

  @LogParams()
  async signup(user: UserDTO): Promise<AuthResponse> {
    const createdUser = await this.user.create(user)
    const authPayload = await this.getAuthToken(createdUser)
    if (createdUser) {
      await this.sendEmailVerification(createdUser.username, createdUser.email)
    }

    return authPayload
  }

  @LogParams()
  async resetPassword(data: {
    username: string
    password: string
  }): Promise<AuthResponse> {
    const updatedUser = await this.user.resetPassword(
      data.username,
      data.password
    )
    await this.cache.del(GET_FORGOT_PASSWORD_TOKEN_KEY(data.username))
    return this.getAuthToken(updatedUser)
  }

  @LogParams()
  async updatePassword(
    username: string,
    data: {
      password: string
      oldPassword: string
    }
  ): Promise<AuthResponse> {
    const updatedUser = await this.user.updatePassword(
      username,
      data.password,
      data.oldPassword
    )
    return this.getAuthToken(updatedUser)
  }

  @LogParams()
  async googleLogin(user: GoogleUser, clientId: string): Promise<AuthResponse> {
    const userOrNull = await this.user.findAndUpdateOauthAccount({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      emailSubscribed: user.emailVerified,
      oauthId: user.oauthId,
      oauthProvider: OAuthProvider.GOOGLE,
    })
    if (userOrNull) {
      return this.getAuthToken(userOrNull)
    }
    /** User does not exist on db sign them up **/
    const newUser = await this.user.createOauthAccount({
      clientId: clientId,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      emailSubscribed: user.emailVerified,
      oauthId: user.oauthId,
      oauthProvider: OAuthProvider.GOOGLE,
      roles: [Role.USER],
    })
    return this.getAuthToken(newUser)
  }

  async createEmailToken(id: string): Promise<string> {
    const token = nanoid(6)
    await this.cache.set(GET_EMAIL_VERIFICATION_TOKEN_KEY(id), token)
    return token
  }

  async verifyEmail(username: string, token: string): Promise<boolean> {
    const storedToken = await this.cache.get(
      GET_EMAIL_VERIFICATION_TOKEN_KEY(username)
    )
    if (!storedToken) {
      return false
    }
    if (storedToken === token) {
      await this.user.findByUsernameAndUpdate(username, {
        emailVerified: true,
        emailSubscribed: true,
      })
      await this.cache.del(GET_EMAIL_VERIFICATION_TOKEN_KEY(username))
      return true
    }
    return false
  }

  async createForgottenPasswordToken(email: string): Promise<string> {
    const forgotPasswordToken = nanoid(16)
    // @TODO add time??
    await this.cache.set(
      GET_FORGOT_PASSWORD_TOKEN_KEY(email),
      forgotPasswordToken
    )
    return forgotPasswordToken
  }

  async sendEmailVerification(
    username: string,
    email: string
  ): Promise<SESMailRTO> {
    const token = await this.createEmailToken(username)
    const user = await this.user.findByUsername(email)
    return await this.aws.sendEmail(
      await this.template.emailVerificationEmail({
        username,
        email: user.email,
        token,
      }),
      false
    )
  }

  async verifyForgotPasswordToken(
    username: string,
    token: string
  ): Promise<boolean> {
    const storedToken = (await this.cache.get(
      GET_FORGOT_PASSWORD_TOKEN_KEY(username)
    )) as string
    if (!storedToken) {
      return false
    }
    return storedToken === token
  }

  async sendForgotPasswordEmail(email: string): Promise<SESMailRTO> {
    const forgotPasswordToken = await this.createForgottenPasswordToken(email)
    return await this.aws.sendEmail(
      await this.template.passwordResetEmail({
        email,
        token: forgotPasswordToken,
      }),
      false
    )
  }

  private async setRefreshToken(userId: string, tokenId: string) {
    return this.cache.set(GET_REFRESH_TOKEN_KEY(userId), tokenId)
  }

  private async getRefreshToken(userId: string) {
    return this.cache.get(GET_REFRESH_TOKEN_KEY(userId))
  }

  private async removeRefreshToken(userId: string) {
    return this.cache.del(GET_REFRESH_TOKEN_KEY(userId))
  }

  private async getAuthToken({
    id,
    username,
    roles,
  }: Partial<User>): Promise<AuthResponse> {
    if (!id || !username || !roles || roles.length < 1) {
      throw new AppError(INVALID_TOKEN_FOR(id, username, roles), AuthFailed)
    }
    const tid = nanoid(6)
    const jwtAccessTokenPayload = { username, sub: id, roles: roles, tid }
    const jwtRefreshTokenPayload = { username, sub: id, roles: roles, tid }
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
      username,
      roles,
      admin: isAdmin(roles),
      expires_in: this.authConfig.jwtAccessTokenOptions.expiresIn,
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: BEARER,
    }
  }

  private async verifyPhoneOTP(data: LoginPhoneDTO): Promise<Partial<User>> {
    const { otp, redirectUri, ...update } = data
    const storedOTP = await this.cache.get(
      GET_PHONE_VERIFICATION_OTP_KEY(data.phone)
    )
    if (!storedOTP) {
      return null
    }
    if (storedOTP === otp) {
      let user
      try {
        user = await this.user.findByPhoneAndUpdate(data.phone, {
          phoneVerified: true,
          phoneSubscribed: true,
        })
      } catch (error) {
        if (error && error.code === RecordToUpdateNotFound) {
          // create a new user
          user = await this.user.create({
            name: undefined,
            email: undefined,
            username: data.phone,
            password: nanoid(8),
            dateOfBirth: undefined,
            roles: [Role.USER],
            ...update,
          })
        } else {
          throw error
        }
      }
      await this.cache.del(GET_PHONE_VERIFICATION_OTP_KEY(data.phone))
      return user
    }
    return null
  }
}
