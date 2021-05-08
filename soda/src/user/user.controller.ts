import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SuccessResponse } from 'src/common/response';
import { CreateUserDto } from './dto';
import { CreateOauthUserDto } from './dto/createUser.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CursorPagination, CursorPaginationOptionsInterface } from 'src/common/pagination';

@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('user/me')
  async getMe(@Req() req): Promise<SuccessResponse> {
    const data = await this.user.find(req.user.id);
    return { data };
  }

  @Put('user/me')
  async updateMe(@Req() req, @Body() body): Promise<SuccessResponse> {
    const data = await this.user.findAndUpdate(req.user.id, body);
    return { data };
  }

  @Delete('user/me')
  async deleteMe(@Req() req): Promise<SuccessResponse> {
    const data = await this.user.delete(req.user.id);
    return { data };
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<SuccessResponse> {
    console.log({id});
    const data = await this.user.find(id);
    return { data };
  }

  @Put('user/:id')
  async updateUser(@Param('id') id: string, @Body() body): Promise<SuccessResponse> {
    const data = await this.user.findAndUpdate(id, body);
    return { data };
  }

  @Roles('ADMIN')
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<SuccessResponse> {
    const data = await this.user.delete(id);
    return { data };
  }

  // @Roles('ADMIN')
  @Get('users')
  async getAllUsers(@Query() query: CursorPagination): Promise<SuccessResponse> {
    const data = await this.user.findAllCursor(query);
    return { data };
  }
}
