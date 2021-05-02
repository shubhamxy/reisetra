import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Profile, User as UserModel } from '@prisma/client'
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { UserRO } from './interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt.gaurd';
import { SuccessResponse, successResponse } from 'src/common/response';

@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<SuccessResponse<UserRO>> {
    return successResponse(this.user.findById(id));
  }


  @Put('user/:id')
  async updateUserById(@Param('id') id: string): Promise<SuccessResponse<UserRO>> {
    return successResponse(this.user.findById(id));
  }


  @Delete('user/:id')
  async deleteUserById(@Param('id') id: string): Promise<SuccessResponse<UserRO>> {
    return successResponse(this.user.findById(id));
  }

  @Get('users')
  async getAllUsers(): Promise<SuccessResponse<Partial<UserModel>[]>> {
    return successResponse(this.user.findAll());
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<SuccessResponse<Partial<Profile>[]>> {
    return successResponse(this.user.findById(req.user.id));
  }
}
