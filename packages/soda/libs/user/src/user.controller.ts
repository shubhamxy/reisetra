import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CustomException, Message, ROUTES, SuccessResponse } from '@app/core'
import { CreateUserDTO, GetAllUsersDTO, UpdateUserDTO } from './dto'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'

@Controller(ROUTES.users)
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get(ROUTES.users_all)
  @Roles(Role.ADMIN)
  async getAllUsers(@Query() query: GetAllUsersDTO): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.user.allUsers(query)
      return { data: results, meta: meta, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.getAllUsers'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<SuccessResponse> {
    try {
      const data = await this.user.create(body)
      return { data, message: Message.created }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.createUser'
      )
    }
  }

  @Get()
  async getUser(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
    try {
      const data = await this.user.find(req.user.id)
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.getUser'
      )
    }
  }

  @Put()
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateUserDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.user.findAndUpdate(req.user.id, body)
      return { data, message: Message.updated }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.updateUser'
      )
    }
  }

  @Delete()
  async deleteUser(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
    const data = await this.user.delete(req.user.id)
    return { data, message: Message.success }
  }

  @Roles(Role.ADMIN)
  @Get(ROUTES.users_by_userId)
  async getUserById(@Param('userId') userId: string): Promise<SuccessResponse> {
    try {
      const data = await this.user.find(userId)
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.deleteUser'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put(ROUTES.users_by_userId)
  async updateUserById(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.user.findAndUpdate(userId, body)
      return { data, message: Message.updated }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.updateUserById'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete(ROUTES.users_by_userId)
  async deleteUserId(
    @Param('userId') userId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.user.delete(userId)
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'UserController.deleteUserId'
      )
    }
  }
}
