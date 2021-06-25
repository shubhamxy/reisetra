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
} from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { CustomException, SuccessResponse } from "src/common/response";
import { ConfigService } from "@nestjs/config";
import { AppEnv } from "src/config";
import { FilesService } from "./files.service";
import { UploadUrlProps } from "src/utils";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { AddFileDTO, GetAllFilesDto, UploadFileDTO } from "./dto/file.dto";
import { FileType } from ".prisma/client";

@Controller()
export class FilesController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
    private readonly files: FilesService
  ) {
    logger.setContext(FilesController.name);
  }

  @Get("files")
  async getFiles(@Query() query: GetAllFilesDto): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.files.getAllFiles(query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "FilesController.getTags"
      );
    }
  }

  @Put("file")
  async addFile(
    @Req() request: AuthenticatedRequest,
    @Body() body: AddFileDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.files.addFile(request.user.id, body);
      return {
        data: data,
      };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "FilesController.addFile"
      );
    }
  }

  @Post("file/upload")
  async getSignedUrl(
    @Req() request: AuthenticatedRequest,
    @Body() body: UploadFileDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.files.uploadFile({
        userId: request.user.id,
        contentType: body.contentType,
        fileName: body.fileName,
        fileType: body.fileType,
      });
      return {
        data: data,
      };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "FilesController.getSignedUrl"
      );
    }
  }

  @Delete("file")
  async deleteFile(
    @Req() request: AuthenticatedRequest,
    @Body('id') id: string,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.files.deleteFile(request.user.id, id);
      this.logger.info("s3.deleteObject::" + data.id);
      return {
        data: data,
      };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "FilesController.deleteFile"
      );
    }
  }
}
