import { User } from '.prisma/client';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gaurd/local.gaurd';
import { AuthUserDto } from './dto/login.dto';
import JwtRefreshGuard from './gaurd/refresh.gaurd';
import { CreateUserDto } from 'src/user/dto';
import { successResponse } from 'src/common/response';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req, @Body() body: AuthUserDto) {
    return successResponse(this.authService.login(req.user));
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  async refresh(@Req() request) {
    await this.authService.removeCurrentRefreshToken(request.user.id);
    return successResponse(this.authService.login(request.user));
  }

  @Public()
  @Post('auth/signup')
  async signup(@Req() req, @Body() body: CreateUserDto) {
    return successResponse(this.authService.signup(body));
  }
}
