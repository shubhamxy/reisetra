import { Body, Controller, Delete, Param, Post, Req } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { SuccessResponse } from "src/common/response";
import { ConfigService } from "@nestjs/config";
import { AppEnv } from "src/config";
import { FilesService } from "./files.service";
import { UploadUrlProps } from "src/utils";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { UploadFileDTO } from "./dto/file.dto";

@Controller()
export class FilesController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
    private readonly files: FilesService
  ) {
    logger.setContext(FilesController.name);
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
    } catch (err) {
      throw err;
    }
  }

  @Delete("file")
  async deleteFile(@Body() body: { key: string }): Promise<SuccessResponse> {
    try {
      const data = await this.files.deleteFile(body.key);
      this.logger.info("s3.deleteObject::" + data.key);
      return {
        data: data,
      };
    } catch (err) {
      throw err;
    }
  }
}
