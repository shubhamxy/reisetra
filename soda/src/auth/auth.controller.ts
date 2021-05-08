import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurd/local.gaurd';
import {
  AuthUserDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './dto/login.dto';
import JwtRefreshGuard from './gaurd/refresh.gaurd';
import { CreateUserDto } from 'src/user/dto';
import { Exception, SuccessResponse } from 'src/common/response';
import { GoogleAuthGuard } from './gaurd/google.gaurd';
import { FRONTEND_URL } from 'src/config';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/email/login')
  async login(
    @Req() request,
    @Body() body: AuthUserDto,
  ): Promise<SuccessResponse> {
    const data = await this.authService.login(request.user);
    return { data };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  async refresh(@Req() request): Promise<SuccessResponse> {
    // await this.authService.removeCurrentRefreshToken(request.user.id);
    const data = await this.authService.login(request.user);
    return { data };
  }

  @Public()
  @Post('auth/email/signup')
  async signup(
    @Req() request,
    @Body() body: CreateUserDto,
  ): Promise<SuccessResponse> {
    const data = await this.authService.signup(body);
    return { data };
  }

  @Public()
  @Get('auth/login/oauth/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() request): Promise<SuccessResponse> {
    return {};
  }

  @Public()
  @Get('auth/login/oauth/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() request): Promise<SuccessResponse> {
    const data = await this.authService.googleLogin(request.user);
    return { data };
  }

  @Public()
  @Get('auth/email/verify/:id/:token')
  public async verifyEmail(@Param() params, @Response() response) {
    const emailVerified = await this.authService.verifyEmail(
      params.id,
      params.token,
    );
    if (emailVerified) {
      // @TODO redirect to success page
      return response.redirect(303, FRONTEND_URL);
    } else {
      // @TODO redirect to error page
      return response.redirect(303, FRONTEND_URL);
    }
  }

  @Get('auth/email/resend-verification')
  public async sendEmailVerification(@Req() request): Promise<SuccessResponse> {
    try {
      const data = await this.authService.sendEmailVerification(
        request.user.id,
        request.user.email,
      );
      return {
        data: {
          emailSent: Boolean(data.MessageId),
        },
      };
    } catch (error) {}
  }

  @Public()
  @Get('auth/email/forgot-password/:email')
  public async sendEmailForgotPassword(
    @Param() params,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.sendForgotPasswordEmail(params.email);
      return {
        data: {
          emailSent: Boolean(data.MessageId),
        },
      };
    } catch (error) {}
  }

  @Public()
  @Get('auth/email/reset-password/:email/:token')
  public async resetPassword(@Param() params, @Response() response) {
    if (params.email && params.token) {
      // @TODO redirect to reset page
      return response.redirect(
        303,
        `${FRONTEND_URL}/auth/reset-password?email=${params.email}&token=${params.token}`,
      );
    } else {
      // @TODO redirect to error page
      return response.redirect(303, FRONTEND_URL);
    }
  }

  @Public()
  @Post('auth/email/reset-password')
  public async setNewPassord(
    @Body() body: ResetPasswordDto,
  ): Promise<SuccessResponse> {
    const tokenVerified = await this.authService.verifyForgotPasswordToken(
      body.email,
      body.token,
    );
    if (tokenVerified) {
      const data = await this.authService.resetPassword(body);
      return { data };
    }
    throw new Exception(
      { message: 'Invalid Token', source: 'auth/email/reset-password' },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('auth/email/update-password')
  public async updatePassord(
    @Body() body: UpdatePasswordDto,
    @Req() request,
  ): Promise<SuccessResponse> {
    const data = await this.authService.updatePassword(
      request.user.email,
      body,
    );
    return { data };
  }
}
