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
import { Public } from 'src/auth/decorator/public.decorator'
import { errorCodes } from 'src/common/codes/error'
import {
    CustomError,
    CustomException,
    SuccessResponse,
    SuccessResponseDTO,
} from 'src/common/response'
import config, { auth, AuthEnv } from 'src/config'
import { CreateUserDto } from 'src/user/dto'
import { User } from 'src/user/entity'
import { AuthenticatedRequest } from './auth.interface'
import { AuthResponse, AuthService } from './auth.service'
import {
    EmailParams,
    ResetPasswordDto,
    UpdatePasswordDto,
    VerifyEmailParams,
} from './dto/login.dto'
import { GoogleAuthGuard } from './gaurd/google.gaurd'
import { LocalAuthGuard } from './gaurd/local.gaurd'
import JwtRefreshGuard from './gaurd/refresh.gaurd'
import { GoogleUser } from './strategy/google.strategy'
const authConfig = auth()

@Controller('auth')
export class AuthController {
    googleOAuth2client: OAuth2Client
    auth: AuthEnv
    constructor(
        private authService: AuthService,
        private config: ConfigService
    ) {
        this.auth = this.config.get<AuthEnv>('auth')
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
    @Post('email/signup')
    async emailSignup(@Body() body: CreateUserDto): Promise<SuccessResponse> {
        try {
            const data = await this.authService.signup(body)
            return { data, message: 'SignUp Success' }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AuthController.emailSignup'
            )
        }
    }

    /**
     * LogIn user with email and password.
     *
     * @returns authentication data
     */
    @Public()
    @Throttle(authConfig.common.throttleLimit, authConfig.common.throttleTTL)
    @UseGuards(LocalAuthGuard)
    @Post('email/login')
    async emailLogin(
        @Req()
        request: AuthenticatedRequest<Record<string, unknown>, Partial<User>>
    ): Promise<SuccessResponseDTO<AuthResponse>> {
        try {
            const data = await this.authService.login(request.user)
            return { data }
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
     * @returns authentication data
     */
    @Public()
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refresh(
        @Req() request: AuthenticatedRequest
    ): Promise<SuccessResponse> {
        try {
            const data = await this.authService.login(request.user)
            return { data }
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
    @Get('login/oauth/google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(): Promise<SuccessResponse> {
        return {
            message: 'GoogleAuth Redirect',
        }
    }

    /**
     * OAuth redirect.
     *
     */
    @Public()
    @Get('login/oauth/google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(
        @Req()
        request: AuthenticatedRequest<Record<string, unknown>, GoogleUser>,
        @Response() response
    ): Promise<SuccessResponse> {
        try {
            const data = await this.authService.googleLogin(request.user)

            return response.redirect(
                303,
                `${config.clientUrl}/login/callback?token=${data.refresh_token}`
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
    @Post('login/oauth/google/verify')
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
                audience: this.config.get<AuthEnv>('auth').googleOAuthOptions
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
            const data = await this.authService.googleLogin(googleUser)
            return { data, message: 'GoogleAuth Success' }
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
    @Get('email/verify/:id/:token')
    public async verifyEmail(
        @Param()
        params: VerifyEmailParams,
        @Response() response
    ) {
        try {
            const emailVerified = await this.authService.verifyEmail(
                params.id,
                params.token
            )
            if (emailVerified) {
                // @TODO redirect to success page
                return response.redirect(303, config.clientUrl)
            } else {
                // @TODO redirect to error page
                return response.redirect(303, config.clientUrl)
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
     *
     */
    @Get('email/resend-verification')
    public async sendEmailVerification(
        @Req() request: AuthenticatedRequest
    ): Promise<SuccessResponse> {
        try {
            const data = await this.authService.sendEmailVerification(
                request.user.id,
                request.user.email
            )
            return {
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

    @Public()
    @Get('email/forgot-password/:email')
    public async sendEmailForgotPassword(
        @Param() params: EmailParams
    ): Promise<SuccessResponse> {
        try {
            const data = await this.authService.sendForgotPasswordEmail(
                params.email
            )
            return {
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

    @Public()
    @Get('email/reset-password/:email/:token')
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
                    `${config.clientUrl}/login/reset-password?email=${params.email}&token=${params.token}`
                )
            } else {
                // @TODO redirect to error page
                return response.redirect(303, config.clientUrl)
            }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AuthController.resetPassword'
            )
        }
    }

    @Public()
    @Post('email/reset-password')
    public async setNewPassord(
        @Body() body: ResetPasswordDto
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
                return { data }
            }

            throw new CustomError(
                'Invalid Token',
                errorCodes.ResetPasswordTokenInvalid,
                'AuthService.setNewPassord'
            )
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AuthController.setNewPassord'
            )
        }
    }

    @Post('email/update-password')
    public async updatePassord(
        @Body() body: UpdatePasswordDto,
        @Req() request: AuthenticatedRequest
    ): Promise<SuccessResponse> {
        try {
            const data = await this.authService.updatePassword(
                request.user.email,
                body
            )
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'AuthController.updatePassord'
            )
        }
    }
}
