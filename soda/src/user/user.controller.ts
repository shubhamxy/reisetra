import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { User as UserModel } from '@prisma/client'
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './service/user.service';
import { UserRO } from './interfaces/user.interface';

@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}
  @Post('user')
  async createUser(@Body() data: CreateUserDto): Promise<UserRO> {
    return this.user.create(data);
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<UserRO> {
    return this.user.findById(id);
  }


  @Put('user/:id')
  async updateUserById(@Param('id') id: number): Promise<UserRO> {
    return this.user.findById(id);
  }


  @Delete('user/:id')
  async deleteUserById(@Param('id') id: number): Promise<UserRO> {
    return this.user.findById(id);
  }

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.user.findAll();
  }

}
