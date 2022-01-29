/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/common/modules/db/prisma.service'
import { CursorPaginationResultInterface } from 'src/common/pagination'
import { CustomError } from 'src/common/response'
import { getUploadURL, UploadUrlProps, deleteObject } from 'src/utils'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { FilesDTO, FileDTO } from './dto/file.dto'
import { File } from './entity'
@Injectable()
export class FilesService {
    constructor(private readonly db: PrismaService) {}
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
                id: 'url',
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

    async uploadFile(params: UploadUrlProps) {
        return getUploadURL(params)
    }

    async deleteFile(userId: string, url: string) {
        try {
            let deleted = {}
            try {
                deleted = await this.db.file.delete({
                    where: {
                        url,
                    },
                })
            } catch (error) {
                console.log(error)
                throw error
            }
            const key = new URL(url).pathname
            if (key) {
                const s3 = await deleteObject(key)
            }
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
