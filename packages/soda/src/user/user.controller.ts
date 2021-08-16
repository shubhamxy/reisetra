import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Put,
    Query,
    Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
    CustomException,
    Exception,
    SuccessResponse,
} from "src/common/response";
import { GetAllUsersDto, UpdateUserDto } from "./dto";
import { errorTypes } from "src/common/codes/error";
import { getErrorMessage, stackObj } from "src/utils/errorUtils";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { Roles } from "src/auth/decorator/roles.decorator";

@Controller()
export class UserController {
    constructor(private readonly user: UserService) {}
    @Roles("ADMIN")
    @Get("users")
    async getAllUsers(
        @Query() query: GetAllUsersDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.user.allUsers(query);
            return { data: results, meta: meta };
        } catch (error) {
            throw new Exception(
                {
                    message: getErrorMessage(error),
                    code: error.code,
                    context: "UserController.getAllUsers",
                    type: errorTypes[error.code],
                    stack: stackObj(error.message),
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get("user/me")
    async getMe(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
        try {
            const data = await this.user.find(req.user.id);
            return { data };
        } catch (error) {
            throw new CustomException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Put("user/me")
    async updateMe(
        @Req() req: AuthenticatedRequest,
        @Body() body: UpdateUserDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.user.findAndUpdate(req.user.id, body);
            return { data };
        } catch (error) {
            throw new Exception(
                {
                    message: getErrorMessage(error),
                    code: error.code,
                    context: "UserController.updateMe",
                    type: errorTypes[error.code],
                    stack: stackObj(error.message),
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete("user/me")
    async deleteMe(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
        const data = await this.user.delete(req.user.id);
        return { data };
    }

    @Roles("ADMIN")
    @Get("user/:id")
    async getUser(@Param("id") id: string): Promise<SuccessResponse> {
        try {
            const data = await this.user.find(id);
            return { data };
        } catch (error) {
            throw new CustomException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Put("user/:id")
    async updateUser(
        @Param("id") id: string,
        @Body() body: UpdateUserDto
    ): Promise<SuccessResponse> {
        const update = body;
        const data = await this.user.findAndUpdate(id, update);
        return { data };
    }

    @Roles("ADMIN")
    @Delete("user/:id")
    async deleteUser(@Param("id") id: string): Promise<SuccessResponse> {
        const data = await this.user.delete(id);
        return { data };
    }
}
