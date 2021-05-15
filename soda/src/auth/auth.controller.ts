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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorator/public.decorator';
import {
  CustomException,
  SuccessResponse,
  SuccessResponseDTO,
} from '../common/response';
import config from '../config';
import { CreateUserDto } from '../user/dto';
import { User } from '../user/entity';
import { AuthenticatedRequest } from './auth.interface';
import { AuthResponse, AuthService } from './auth.service';
import {
  EmailParams,
  ResetPasswordDto,
  UpdatePasswordDto,
  VerifyEmailParams,
} from './dto/login.dto';
import { GoogleAuthGuard } from './gaurd/google.gaurd';
import { LocalAuthGuard } from './gaurd/local.gaurd';
import JwtRefreshGuard from './gaurd/refresh.gaurd';
import { GoogleUser } from './strategy/google.strategy';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/email/signup')
  async emailSignup(@Body() body: CreateUserDto): Promise<SuccessResponse> {
    try {
      const data = await this.authService.signup(body);
      return { data, message: 'SignUp Success' };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.emailSignup',
      );
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/email/login')
  async emailLogin(
    @Req() request: AuthenticatedRequest<{}, Partial<User>>,
  ): Promise<SuccessResponseDTO<AuthResponse>> {
    try {
      const data = await this.authService.login(request.user);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.emailLogin',
      );
    }
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  async refresh(
    @Req() request: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.login(request.user);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.refresh',
      );
    }
  }


  @Public()
  @Get('auth/login/oauth/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<SuccessResponse> {
    return {
      message: 'GoogleAuth Redirect',
    };
  }

  @Public()
  @Get('auth/login/oauth/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() request: AuthenticatedRequest<{}, GoogleUser>,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.googleLogin(request.user);
      return { data, message: 'GoogleAuth Success' };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.googleAuthRedirect',
      );
    }
  }

  @Public()
  @Get('auth/email/verify/:id/:token')
  public async verifyEmail(
    @Param()
    params: VerifyEmailParams,
    @Response() response,
  ) {
    try {
      const emailVerified = await this.authService.verifyEmail(
        params.id,
        params.token,
      );
      if (emailVerified) {
        // @TODO redirect to success page
        return response.redirect(303, config.clientUrl);
      } else {
        // @TODO redirect to error page
        return response.redirect(303, config.clientUrl);
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.verifyEmail',
      );
    }
  }

  @Get('auth/email/resend-verification')
  public async sendEmailVerification(
    @Req() request: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
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
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.sendEmailVerification',
      );
    }
  }

  @Public()
  @Get('auth/email/forgot-password/:email')
  public async sendEmailForgotPassword(
    @Param() params: EmailParams,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.sendForgotPasswordEmail(params.email);
      return {
        data: {
          emailSent: Boolean(data?.MessageId),
        },
      };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.sendEmailForgotPassword',
      );
    }
  }

  @Public()
  @Get('auth/email/reset-password/:email/:token')
  public async resetPassword(
    @Param()
    params: {
      email: string;
      token: string;
    },
    @Response() response,
  ) {
    try {
      if (params.email && params.token) {
        // @TODO redirect to reset page
        return response.redirect(
          303,
          `${config.clientUrl}/auth/reset-password?email=${params.email}&token=${params.token}`,
        );
      } else {
        // @TODO redirect to error page
        return response.redirect(303, config.clientUrl);
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.resetPassword',
      );
    }
  }

  @Public()
  @Post('auth/email/reset-password')
  public async setNewPassord(
    @Body() body: ResetPasswordDto,
  ): Promise<SuccessResponse> {
    try {
      const tokenVerified = await this.authService.verifyForgotPasswordToken(
        body.email,
        body.token,
      );
      if (tokenVerified) {
        const data = await this.authService.resetPassword({
          email: body.email,
          password: body.password,
        });
        return { data };
      }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.setNewPassord',
      );
    }
  }

  @Post('auth/email/update-password')
  public async updatePassord(
    @Body() body: UpdatePasswordDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.authService.updatePassword(
        request.user.email,
        body,
      );
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'AuthController.updatePassord',
      );
    }
  }
}
