/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@nestjs/common'
import {Prisma} from '@prisma/client'
import {AWSService, FileUploadDTO} from '@app/aws'
import {DbService} from '@app/db'
import {CursorPaginationResultInterface, CustomError} from '@app/core'
import {prismaOffsetPagination} from '@app/utils'
import {FileDTO, FilesDTO} from './dto/file.dto'
import {File} from './entity'

@Injectable()
export class FileService {
  constructor(
    private readonly db: DbService,
    private readonly awsService: AWSService
  ) {}

  async getAllFiles(
    options: FilesDTO
  ): Promise<CursorPaginationResultInterface<File>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options

      const whereObj: Prisma.FileWhereInput = {
        active: true,
      }

      if (options.userId) {
        whereObj.userId = options.userId
      }
      if (options.fileType) {
        whereObj.fileType = options.fileType
      }
      if (options.productId) {
        whereObj.productId = options.productId
      }
      if (options.reviewId) {
        whereObj.reviewId = options.reviewId
      }
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'file',
        prisma: this.db,
        where: whereObj,
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'FilesService.getAllFiles'
      )
    }
  }

  async getFiles(
    options: FilesDTO,
    userId: string
  ): Promise<CursorPaginationResultInterface<File>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options

      const whereObj: Prisma.FileWhereInput = {
        active: true,
        userId,
      }

      if (options.fileType) {
        whereObj.fileType = options.fileType
      }
      if (options.productId) {
        whereObj.productId = options.productId
      }
      if (options.reviewId) {
        whereObj.reviewId = options.reviewId
      }
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'file',
        prisma: this.db,
        where: whereObj,
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'FilesService.getAllFiles'
      )
    }
  }

  async addFile(userId: string, options: Partial<FileDTO>) {
    try {
      const { url, ...other } = options
      const result = await this.db.file.upsert({
        create: {
          url: options.url,
          ...other,
          userId,
        },
        update: {
          ...other,
          userId,
        },
        where: {
          url: url,
        },
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'FilesService.addFile'
      )
    }
  }

  async uploadFile(params: FileUploadDTO) {
    const data = await this.awsService.getUploadURL(params)
    const { id, contentType, signedUrl, expiresIn, fileName, ...other } = data

    await this.addFile(params.userId, {
      ...other,
      meta: {
        id,
        contentType,
        fileName,
      },
    })
    return data
  }

  async deleteFile(userId: string, url: string) {
    try {
      const key = new URL(url).pathname
      if (!key) {
        throw new Error('Key not found')
      }
      let deleted = []
      try {
        deleted = await this.db.$transaction([
          this.db.file.update({
            where: {
              url,
            },
            data: {
              product: {
                disconnect: true,
              },
              review: {
                disconnect: true,
              },
              story: {
                disconnect: true,
              },
              tag: {
                disconnect: true,
              },
              user: {
                disconnect: true,
              },
            },
          }),
          this.db.file.delete({
            where: {
              url,
            },
          }),
        ])
      } catch (error) {
        console.log(error)
        throw error
      }
      await this.awsService.deleteObject(key)
      return {
        ...deleted,
        id: key,
      }
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'FilesService.deleteFile'
      )
    }
  }
}
