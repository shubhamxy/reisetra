import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Throttle } from '@nestjs/throttler'
import { OAuth2Client } from 'google-auth-library'
import { CreateUserDTO, User } from '@app/user'
import {
  CustomError,
  CustomException,
  errorCodes,
  Message,
  ROUTES,
  SuccessResponse,
  SuccessResponseDTO,
} from '@app/core'
import { AppEnv, auth, AuthEnv, Config } from '@app/config'
import {
  AuthResponse,
  EmailDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
  VerifyEmailDTO,
} from './dto'
import { GoogleAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './gaurd'
import { GoogleUser } from './strategy'
import { AuthService } from './auth.service'
import { Public } from './decorator'
import { AuthenticatedRequest } from './auth.interface'

const authConfig = auth()

@Controller(ROUTES.auth)
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
   * @param body User details
   * @returns authentication data
   */
  @Public()
  @Post(ROUTES.email_signup)
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  async emailSignup(@Body() body: CreateUserDTO): Promise<SuccessResponse> {
    try {
      const data = await this.authService.signup(body)
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.emailSignup'
      )
    }
  }

  /**
   *  LogIn user with email and password.
   *  @param request
   *  @returns {SuccessResponseDTO<AuthResponse>} authentication data
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @UseGuards(LocalAuthGuard)
  @Post(ROUTES.email_login)
  async emailLogin(
    @Req()
    request: AuthenticatedRequest<Record<string, string>, Partial<User>>
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    try {
      const data = await this.authService.login(request.user)
      return { data, message: Message.created }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.emailLogin'
      )
    }
  }

  /**
   * Refresh authentication token.
   *
   * @returns {SuccessResponseDTO<AuthResponse>} authentication data
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @UseGuards(JwtRefreshGuard)
  @Get(ROUTES.refresh)
  async refresh(
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    try {
      const data = await this.authService.login(request.user)
      return { data, message: Message.created }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.refresh'
      )
    }
  }

  /**
   * OAuth redirect for google.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(ROUTES.login_oauth_google)
  @UseGuards(GoogleAuthGuard)
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
  @Get(ROUTES.login_oauth_google_redirect)
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req()
    request: AuthenticatedRequest<Record<string, string>, GoogleUser>,
    @Response() response
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.googleLogin(request.user, undefined)

      return response.redirect(
        303,
        `${this.app.callbackUrl}?token=${data.refresh_token}`
      )
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.googleAuthRedirect'
      )
    }
  }

  /**
   * Verify OAuth login.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(ROUTES.login_oauth_google_verify)
  async googleAuthEndPoint(
    @Body()
    body: {
      credential: string
      clientId: string
      select_by: string
    }
  ): Promise<SuccessResponse> {
    try {
      const loginData = await this.googleOAuth2client.verifyIdToken({
        idToken: body.credential,
        audience: this.configService.get<AuthEnv>(Config.auth)
          .googleOAuthOptions.clientID,
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
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.googleAuthRedirect'
      )
    }
  }

  /**
   * Verify email.
   *
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(ROUTES.email_verify_by_userId_and_token)
  public async verifyEmail(
    @Param()
    params: VerifyEmailDTO
  ) {
    try {
      const emailVerified = await this.authService.verifyEmail(
        params.userId,
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
        throw new CustomError(
          'Verify Email Failed',
          errorCodes.EMailNotVerified,
          'AuthController.verifyEmail'
        )
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.verifyEmail'
      )
    }
  }

  /**
   * Resend verification email.
   * @returns request
   */
  @Get(ROUTES.auth_email_resend_verification)
  public async sendEmailVerification(
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.sendEmailVerification(
        request.user.id,
        request.user.email
      )
      return {
        message: Message.success,
        data: {
          emailSent: Boolean(data.MessageId),
        },
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.sendEmailVerification'
      )
    }
  }

  /**
   * Send forgot password email.
   *
   * @param params
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Get(ROUTES.email_forgot_password_by_email)
  public async sendEmailForgotPassword(
    @Param() params: EmailDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.sendForgotPasswordEmail(params.email)
      return {
        message: Message.success,
        data: {
          emailSent: Boolean(data?.MessageId),
        },
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.sendEmailForgotPassword'
      )
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
  @Get(ROUTES.email_reset_password_by_email_and_token)
  public async resetPassword(
    @Param()
    params: {
      email: string
      token: string
    },
    @Response() response
  ) {
    try {
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
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.resetPassword'
      )
    }
  }

  /**
   * Reset user password
   *
   * @param body
   */
  @Public()
  @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
  @Post(ROUTES.email_reset_password)
  public async setNewPassword(
    @Body() body: ResetPasswordDTO
  ): Promise<SuccessResponse> {
    try {
      const tokenVerified = await this.authService.verifyForgotPasswordToken(
        body.email,
        body.token
      )
      if (tokenVerified) {
        const data = await this.authService.resetPassword({
          email: body.email,
          password: body.password,
        })
        return { data, message: Message.success }
      }

      throw new CustomError(
        'Invalid Reset Token',
        errorCodes.ResetPasswordTokenInvalid,
        'AuthService.setNewPassword'
      )
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.setNewPassword'
      )
    }
  }

  /**
   * Update user password
   *
   * @param body
   * @param request
   */
  @Post(ROUTES.email_update_password)
  public async updatePassword(
    @Body() body: UpdatePasswordDTO,
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.updatePassword(
        request.user.email,
        body
      )
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.updatePassword'
      )
    }
  }
}
