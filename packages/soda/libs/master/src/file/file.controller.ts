import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { Routes, SuccessResponse } from '@app/core'
import { FileService } from './file.service'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'
import { FileDTO, FilesDTO, FileUploadDTO } from './dto/file.dto'
import { ExceptionHandler } from '@app/core/decorators'
import { URL } from '@app/master/file/file.const'

@Controller(Routes.files)
export class FileController {
  constructor(private readonly files: FileService) {}

  @Roles(Role.ADMIN)
  @Get(Routes.files_all)
  @ExceptionHandler()
  async getAllFiles(@Query() query: FilesDTO): Promise<SuccessResponse> {
    const { results, ...meta } = await this.files.getAllFiles(query)
    return { data: results || [], meta: meta }
  }

  @Get()
  @ExceptionHandler()
  async getFiles(
    @Query() query: FilesDTO,
    @Req() request: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.files.getFiles(
      query,
      request.user.id
    )
    return { data: results || [], meta: meta }
  }

  @Post()
  @ExceptionHandler()
  async getSignedUrl(
    @Req() request: AuthenticatedRequest,
    @Body() body: FileUploadDTO
  ): Promise<SuccessResponse> {
    const data = await this.files.uploadFile({
      userId: request.user.id,
      contentType: body.contentType,
      fileName: body.fileName,
      fileType: body.fileType,
    })
    return {
      data,
    }
  }

  @Put()
  @ExceptionHandler()
  async addFile(
    @Req() request: AuthenticatedRequest,
    @Body() body: FileDTO
  ): Promise<SuccessResponse> {
    const data = await this.files.addFile(request.user.id, body)
    return {
      data,
    }
  }

  @Roles(Role.ADMIN)
  @Delete()
  @ExceptionHandler()
  async deleteFile(
    @Req() request: AuthenticatedRequest,
    @Body(URL) url: string
  ): Promise<SuccessResponse> {
    const data = await this.files.deleteFile(request.user.id, url)
    return {
      data,
    }
  }
}
