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
} from '@nestjs/common';
import { UserService } from './user.service';
import { SuccessResponse } from 'src/common/response';

@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<SuccessResponse> {
    const data = await this.user.findById(id);
    return { data };
  }

  @Put('user/:id')
  async updateUserById(@Param('id') id: string): Promise<SuccessResponse> {
    const data = await this.user.findById(id);
    return { data };
  }

  @Delete('user/:id')
  async deleteUserById(@Param('id') id: string): Promise<SuccessResponse> {
    const data = await this.user.findById(id);
    return { data };
  }

  @Get('users')
  async getAllUsers(): Promise<SuccessResponse> {
    const data = await this.user.findAllOffset({page: 0, limit: 10});
    return { data };
  }

  @Get('profile')
  async getProfile(@Req() req): Promise<SuccessResponse> {
    const profile = await this.user.findById(req.user.id);
    return { data: {profile} };
  }
}
