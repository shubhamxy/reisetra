import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Message, Routes, SuccessResponse } from '@app/core'
import { UpdateUserDTO, UserDTO, UsersDTO } from './dto'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'
import { ExceptionHandler } from '@app/core/decorators/exceptionHandler.decorator'
import { USER_ID, USERNAME } from './user.const'

@Controller(Routes.users)
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get(Routes.users_all)
  @Roles(Role.ADMIN)
  @ExceptionHandler()
  async getAllUsers(@Query() query: UsersDTO): Promise<SuccessResponse> {
    const { results, ...meta } = await this.user.allUsers(query)
    return { data: results, meta: meta, message: Message.success }
  }

  @Post()
  @Roles(Role.ADMIN)
  @ExceptionHandler()
  async createUser(@Body() user: UserDTO): Promise<SuccessResponse> {
    const data = await this.user.create(user)
    return { data, message: Message.created }
  }

  @Get()
  @ExceptionHandler()
  async getUser(
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    const data = await this.user.findByUsername(request.user.username)
    return { data, message: Message.success }
  }

  @Put()
  @ExceptionHandler()
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateUserDTO
  ): Promise<SuccessResponse> {
    const data = await this.user.findByUsernameAndUpdate(
      req.user.username,
      body
    )
    return { data, message: Message.updated }
  }

  @Delete()
  @ExceptionHandler()
  async deleteUser(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
    const data = await this.user.deleteByUsername(req.user.id)
    return { data, message: Message.success }
  }

  @Roles(Role.ADMIN)
  @Get(Routes.users_by_username)
  @ExceptionHandler()
  async getUserById(
    @Param(USERNAME) username: string
  ): Promise<SuccessResponse> {
    const data = await this.user.findByUsername(username)
    return { data, message: Message.success }
  }

  @Roles(Role.ADMIN)
  @Put(Routes.users_by_username)
  @ExceptionHandler()
  async updateUserById(
    @Param(USERNAME) username: string,
    @Body() body: UpdateUserDTO
  ): Promise<SuccessResponse> {
    const data = await this.user.findByUsernameAndUpdate(username, body)
    return { data, message: Message.updated }
  }

  @Roles(Role.ADMIN)
  @Delete(Routes.users_by_username)
  @ExceptionHandler()
  async deleteUserId(
    @Param(USERNAME) username: string
  ): Promise<SuccessResponse> {
    const data = await this.user.deleteByUsername(username)
    return { data, message: Message.success }
  }
}
