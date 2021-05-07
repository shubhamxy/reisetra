import { User } from '.prisma/client';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { Local, Public } from 'src/auth/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurd/local.gaurd';
import { AuthUserDto } from './dto/login.dto';
import JwtRefreshGuard from './gaurd/refresh.gaurd';
import { CreateUserDto } from 'src/user/dto';
import { DataT, SuccessResponse } from 'src/common/response';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './gaurd/google.gaurd';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request, @Body() body: AuthUserDto): Promise<SuccessResponse> {
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
  @Post('auth/signup')
  async signup(@Req() request, @Body() body: CreateUserDto): Promise<SuccessResponse> {
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
    return {data}
  }
}
