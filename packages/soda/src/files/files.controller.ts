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
import { PinoLogger } from 'nestjs-pino'
import { CustomException, SuccessResponse } from 'src/common/response'
import { FilesService } from './files.service'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { FileDTO, FilesDTO, FileUploadDTO } from './dto/file.dto'
import { Roles } from 'src/auth/decorator/roles.decorator'

@Controller()
export class FilesController {
    constructor(
        private readonly logger: PinoLogger,
        private readonly files: FilesService
    ) {
        logger.setContext(FilesController.name)
    }

    @Roles('ADMIN')
    @Get('files')
    async getFiles(@Query() query: FilesDTO): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.files.getAllFiles(query)
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FilesController.getFiles'
            )
        }
    }

    @Put('file')
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

    @Post('file/upload')
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
            const {
                id,
                contentType,
                signedUrl,
                expiresIn,
                fileName,
                ...other
            } = data
            await this.files.addFile(request.user.id, {
                ...other,
                meta: {
                    id,
                    contentType,
                    fileName,
                },
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

    @Roles('ADMIN')
    @Delete('file')
    async deleteFile(
        @Req() request: AuthenticatedRequest,
        @Body('url') url: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.files.deleteFile(request.user.id, url)
            this.logger.info('s3.deleteObject::' + data.id)
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
