import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Throttle } from '@nestjs/throttler'
import { OAuth2Client } from 'google-auth-library'
import { User, UserDTO } from '@app/user'
import {
  AppError,
  EMailNotVerified,
  Message,
  PhoneNotVerified,
  ResetPasswordTokenInvalid,
  Routes,
  SuccessResponse,
  SuccessResponseDTO,
} from '@app/core'
import { AppEnv, auth, AuthEnv, Config } from '@app/config'
import {
  AuthResponse,
  EmailDTO,
  LoginPhoneDTO,
  LoginPhoneOTPDTO,
  ResetEmailDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  VerifyEmailDTO,
} from './dto'
import { GoogleAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './gaurd'
import { GoogleUser } from './strategy'
import { AuthService } from './auth.service'
import { Public } from './decorator'
import { AuthenticatedRequest } from './auth.interface'
import { PublishResponse } from 'aws-sdk/clients/sns'
import { ExceptionHandler } from '@app/core/decorators/exceptionHandler.decorator'
import {
  EMAIL_VERIFICATION_FAILED,
  INVALID_RESET_TOKEN,
  PHONE_VERIFICATION_FAILED,
} from '@app/auth/auth.const'

const authConfig = auth()

@Controller(Routes.auth)
export class AuthController {
  private readonly googleOAuth2client: OAuth2Client
  private readonly app: AppEnv
  private readonly auth: AuthEnv

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    this.app = this.configService.get<AppEnv>(Config.app)
    this.auth = this.configService.get<AuthEnv>(Config.auth)
    this.googleOAuth2client = new OAuth2Client(
      this.auth.googleOAuthOptions.clientID
    )
  }

  /**
   * Sign up user using email method.
   *
   * @param user User details
   * @returns authentication data
   */
  @Public()
  @Post(Routes.email_signup)
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @ExceptionHandler()
  async emailSignup(@Body() user: UserDTO): Promise<SuccessResponse> {
    const data = await this.authService.signup(user)
    return { data, message: Message.success }
  }

  /**
   *  LogIn user with email and password.
   *  @param request
   *  @returns {SuccessResponseDTO<AuthResponse>} authentication data
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @UseGuards(LocalAuthGuard)
  @Post(Routes.email_login)
  @ExceptionHandler()
  async emailLogin(
    @Req()
    request: AuthenticatedRequest<Record<string, string>, Partial<User>>
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    const data = await this.authService.login(request.user)
    return { data, message: Message.created }
  }

  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(Routes.phone_login)
  @ExceptionHandler()
  async phoneLogin(
    @Body() body: LoginPhoneDTO
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    const data = await this.authService.loginPhone(body)
    if (data) {
      return { data, message: Message.success }
    }
    throw new AppError(PHONE_VERIFICATION_FAILED, PhoneNotVerified)
  }

  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(Routes.phone_otp)
  @ExceptionHandler()
  async phoneOTP(
    @Body() body: LoginPhoneOTPDTO
  ): Promise<SuccessResponseDTO<PublishResponse>> {
    const data = await this.authService.sendPhoneOTP(body)
    return { data, message: Message.success }
  }

  /**
   * Refresh authentication token.
   *
   * @returns {SuccessResponseDTO<AuthResponse>} authentication data
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @UseGuards(JwtRefreshGuard)
  @Get(Routes.refresh)
  @ExceptionHandler()
  async refresh(
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    const data = await this.authService.login(request.user)
    return { data, message: Message.created }
  }

  /**
   * OAuth redirect for google.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(Routes.login_oauth_google)
  @UseGuards(GoogleAuthGuard)
  @ExceptionHandler()
  async googleAuth(): Promise<SuccessResponse> {
    return {
      message: Message.redirected,
    }
  }

  /**
   * OAuth redirect.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(Routes.login_oauth_google_redirect)
  @UseGuards(GoogleAuthGuard)
  @ExceptionHandler()
  async googleAuthRedirect(
    @Req()
    request: AuthenticatedRequest<Record<string, string>, GoogleUser>,
    @Response() response
  ): Promise<SuccessResponse> {
    const data = await this.authService.googleLogin(request.user, undefined)

    return response.redirect(
      303,
      `${this.app.callbackUrl}?token=${data.refresh_token}`
    )
  }

  /**
   * Verify OAuth login.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(Routes.login_oauth_google_verify)
  @ExceptionHandler()
  async googleAuthEndPoint(
    @Body()
    body: {
      credential: string
      clientId: string
      select_by: string
    }
  ): Promise<SuccessResponse> {
    const loginData = await this.googleOAuth2client.verifyIdToken({
      idToken: body.credential,
      audience: this.configService.get<AuthEnv>(Config.auth).googleOAuthOptions
        .clientID,
    })
    const payload = loginData.getPayload()
    const googleUser: GoogleUser = {
      oauthId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
      name: payload.name,
      avatar: payload.picture,
      oauthProvider: 'GOOGLE',
    }
    const data = await this.authService.googleLogin(googleUser, body.clientId)
    return { data, message: Message.created }
  }

  /**
   * Verify email.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(Routes.email_verify_by_username_and_token)
  @ExceptionHandler()
  public async verifyEmail(
    @Param()
    params: VerifyEmailDTO
  ) {
    const emailVerified = await this.authService.verifyEmail(
      params.username,
      params.token
    )
    if (emailVerified) {
      // @TODO redirect to success page
      return {
        data: {
          emailVerified,
        },
        message: Message.success,
      }
    } else {
      throw new AppError(EMAIL_VERIFICATION_FAILED, EMailNotVerified)
    }
  }

  /**
   * Resend verification email.
   * @returns request
   */
  @Get(Routes.auth_email_resend_verification)
  @ExceptionHandler()
  public async sendEmailVerification(
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    const data = await this.authService.sendEmailVerification(
      request.user.id,
      request.user.username
    )
    return {
      message: Message.success,
      data: {
        emailSent: Boolean(data.MessageId),
      },
    }
  }

  /**
   * Send forgot password email.
   *
   * @param params
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(Routes.email_forgot_password_by_email)
  @ExceptionHandler()
  public async sendEmailForgotPassword(
    @Param() params: EmailDTO
  ): Promise<SuccessResponse> {
    const data = await this.authService.sendForgotPasswordEmail(params.email)
    return {
      message: Message.success,
      data: {
        emailSent: Boolean(data?.MessageId),
      },
    }
  }

  /**
   * Reset password with reset token.
   *
   * @param params
   * @param response
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(Routes.email_reset_password_by_email_and_token)
  @ExceptionHandler()
  public async resetPassword(
    @Param()
    params: ResetEmailDTO,
    @Response() response
  ) {
    if (params.email && params.token) {
      // @TODO redirect to reset page
      return response.redirect(
        303,
        `${this.app.authUrl}/reset-password?email=${params.email}&token=${params.token}`
      )
    } else {
      // @TODO redirect to error page
      return response.redirect(303, this.app.clientUrl)
    }
  }

  /**
   * Reset user password
   *
   * @param body
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(Routes.email_reset_password)
  @ExceptionHandler()
  public async setNewPassword(
    @Body() body: ResetPasswordDTO
  ): Promise<SuccessResponse> {
    const tokenVerified = await this.authService.verifyForgotPasswordToken(
      body.email,
      body.token
    )
    if (tokenVerified) {
      const data = await this.authService.resetPassword({
        username: body.email,
        password: body.password,
      })
      return { data, message: Message.success }
    }
    throw new AppError(INVALID_RESET_TOKEN, ResetPasswordTokenInvalid)
  }

  /**
   * Update user password
   *
   * @param body
   * @param request
   */
  @Post(Routes.email_update_password)
  @ExceptionHandler()
  public async updatePassword(
    @Body() body: UpdatePasswordDTO,
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    const data = await this.authService.updatePassword(
      request.user.username,
      body
    )
    return { data, message: Message.success }
  }
}
