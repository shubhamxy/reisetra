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
import { CustomException, Exception, SuccessResponse } from 'src/core/response'
import { CreateUserDTO, GetAllUsersDTO, UpdateUserDTO } from './dto'
import { errorTypes } from 'src/core/codes/error'
import { getErrorMessage, stackObj } from 'src/utils/errorUtils'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles, Role } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/core/constants'

@Controller(ROUTES.users)
export class UserController {
    constructor(private readonly user: UserService) {}

    @Roles(Role.ADMIN)
    @Get(ROUTES.users_all)
    async getAllUsers(
        @Query() query: GetAllUsersDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.user.allUsers(query)
            return { data: results, meta: meta }
        } catch (error) {
            throw new Exception(
                {
                    message: getErrorMessage(error),
                    code: error.code,
                    context: 'UserController.getAllUsers',
                    type: errorTypes[error.code],
                    stack: stackObj(error.message),
                },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Roles(Role.ADMIN)
    @Post()
    async createUser(@Body() body: CreateUserDTO): Promise<SuccessResponse> {
        try {
            const data = await this.user.create(body)
            return { data }
        } catch (error) {
            throw new CustomException(error, HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getUser(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
        try {
            const data = await this.user.find(req.user.id)
            return { data }
        } catch (error) {
            throw new CustomException(error, HttpStatus.BAD_REQUEST)
        }
    }

    @Put()
    async updateUser(
        @Req() req: AuthenticatedRequest,
        @Body() body: UpdateUserDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.user.findAndUpdate(req.user.id, body)
            return { data }
        } catch (error) {
            throw new Exception(
                {
                    message: getErrorMessage(error),
                    code: error.code,
                    context: 'UserController.updateMe',
                    type: errorTypes[error.code],
                    stack: stackObj(error.message),
                },
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete()
    async deleteUser(
        @Req() req: AuthenticatedRequest
    ): Promise<SuccessResponse> {
        const data = await this.user.delete(req.user.id)
        return { data }
    }

    @Roles(Role.ADMIN)
    @Get(ROUTES.users_by_userId)
    async getUserById(
        @Param('userId') userId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.user.find(userId)
            return { data }
        } catch (error) {
            throw new CustomException(error, HttpStatus.BAD_REQUEST)
        }
    }

    @Roles(Role.ADMIN)
    @Put(ROUTES.users_by_userId)
    async updateUserById(
        @Param('userId') userId: string,
        @Body() body: UpdateUserDTO
    ): Promise<SuccessResponse> {
        const update = body
        const data = await this.user.findAndUpdate(userId, update)
        return { data }
    }

    @Roles(Role.ADMIN)
    @Delete(ROUTES.users_by_userId)
    async deleteUserId(
        @Param('userId') userId: string
    ): Promise<SuccessResponse> {
        const data = await this.user.delete(userId)
        return { data }
    }
}
