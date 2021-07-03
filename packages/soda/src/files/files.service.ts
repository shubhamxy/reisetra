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
      const whereObj = {
        active: true,
      };
      if (options.userId) {
        whereObj["userId"] = options.userId;
      }
      if (options.contentType) {
        whereObj["contentType"] = options.contentType;
      }
      if (options.fileType) {
        whereObj["fileType"] = options.fileType;
      }
      if (options.productId) {
        whereObj["productId"] = options.productId;
      }
      if (options.reviewId) {
        whereObj["reviewId"] = options.reviewId;
      }
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "file",
        prisma: this.db,
        where: whereObj,
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

  async addFile(userId: string, options: AddFileDTO) {
    try {
      const result = await this.db.file.upsert({
        create: {
          userId,
          id: options.id,
          url: options.url,
          fileType: options.fileType,
          contentType: options.contentType,
          productId: options.productId,
          reviewId: options.reviewId,
          categoryId: options.categoryId,
        },
        update: {
          userId,
          id: options.id,
          url: options.url,
          fileType: options.fileType,
          contentType: options.contentType,
          productId: options.productId,
          reviewId: options.reviewId,
          categoryId: options.categoryId,
        },
        where: {
          id: options.id,
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

  async deleteFile(userId: string, id: string) {
    try {
      let deleted = {};
      try {
        deleted = await this.db.file.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
      const s3 = await deleteObject(id);
      return {
        ...deleted,
        id: s3.key,
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
