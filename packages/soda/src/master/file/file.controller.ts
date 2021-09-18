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
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import { FileService } from './file.service'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'
import { FileDTO, FilesDTO, FileUploadDTO } from './dto/file.dto'

@Controller(ROUTES.files)
export class FileController {
  constructor(private readonly files: FileService) {}

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
