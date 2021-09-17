/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common'
import { CustomException, SuccessResponse } from 'src/core/response'
import { FilesService } from './files.service'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { FileDTO, FilesDTO, FileUploadDTO } from './dto/file.dto'
import { Role, Roles } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/core/constants'

@Controller(ROUTES.files)
export class FilesController {
    constructor(private readonly files: FilesService) {}

    @Roles(Role.ADMIN)
    @Get(ROUTES.files_all)
    async getAllFiles(@Query() query: FilesDTO): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.files.getAllFiles(query)
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.getAllFiles'
            )
        }
    }

    @Get()
    async getFiles(
        @Query() query: FilesDTO,
        @Req() request: AuthenticatedRequest
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.files.getFiles(
                query,
                request.user.id
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.getFiles'
            )
        }
    }

    @Post()
    async getSignedUrl(
        @Req() request: AuthenticatedRequest,
        @Body() body: FileUploadDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.files.uploadFile({
                userId: request.user.id,
                contentType: body.contentType,
                fileName: body.fileName,
                fileType: body.fileType,
            })
            return {
                data: data,
            }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.getSignedUrl'
            )
        }
    }

    @Put()
    async addFile(
        @Req() request: AuthenticatedRequest,
        @Body() body: FileDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.files.addFile(request.user.id, body)
            return {
                data: data,
            }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.addFile'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Delete()
    async deleteFile(
        @Req() request: AuthenticatedRequest,
        @Body('url') url: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.files.deleteFile(request.user.id, url)
            return {
                data: data,
            }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.deleteFile'
            )
        }
    }
}
