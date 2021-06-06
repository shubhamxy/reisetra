import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CursorPaginationResultInterface } from "src/common/pagination";
import { CustomError } from "src/common/response";
import { getUploadURL, UploadUrlProps, deleteObject } from "src/utils";
import { prismaOffsetPagination } from "src/utils/prisma";
import { AddFileDTO, GetAllFilesDto } from "./dto/file.dto";
import { File, FileType } from "./entity";
@Injectable()
export class FilesService {
  constructor(private readonly db: PrismaService) {}
  async getAllFiles(
    options: GetAllFilesDto
  ): Promise<CursorPaginationResultInterface<File>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "file",
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "FilesService.getAllFiles"
      );
    }
  }
  async addFile(userId, options: AddFileDTO) {
    try {
      const result = await this.db.file.create({
        data: {
          fileName: options.fileName,
          fileType: options.fileType,
          userId,
          contentType: options.contentType,
          url: options.url,
          productId: options.productId,
          reviewId: options.reviewId,
        },
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "FilesService.addFile"
      );
    }
  }

  async uploadFile(params: UploadUrlProps) {
    return getUploadURL(params);
  }
  async deleteFile(userId: string, fileType: FileType, fileName: string) {
    try {
      let deleted = {};
      try {
        deleted = await this.db.file.delete({
          where: {
            userId_fileName_fileType: {
              userId,
              fileName,
              fileType,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
      const s3 = await deleteObject(`${userId}/${fileType}/${fileName}`);
      return {
        key: s3.key,
        ...deleted,
      };
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "FilesService.deleteFile"
      );
    }
  }
}
