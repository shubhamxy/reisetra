import { Injectable } from '@nestjs/common'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { CacheService } from 'src/core/modules/cache/cache.service'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { CreateTagDTO, UpdateTagDTO, GetAllTagsDTO } from './dto'
import { OrderDirection } from '../../core/dto'
import type { Prisma } from '.prisma/client'
import { CursorPaginationResultInterface } from 'src/core/pagination'
import { TagRO, TagsRO } from './interfaces'

@Injectable()
export class TagService {
    constructor(
        private readonly db: PrismaService,
        private readonly cache: CacheService
    ) {}

    async getAllTags(
        options: GetAllTagsDTO
    ): Promise<CursorPaginationResultInterface<TagRO>> {
        try {
            const whereObj = {}
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = OrderDirection.asc,
            } = options
            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: 'tag',
                where: whereObj,
                include: {
                    label: true,
                    value: true,
                    description: true,
                    styles: true,
                },
                prisma: this.db,
            })
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.getAllTags'
            )
        }
    }

    async getTags(category?: string): Promise<TagsRO> {
        try {
            const findObj: Prisma.TagFindManyArgs = {
                take: 20,
                include: {
                    images: {
                        select: {
                            url: true,
                            meta: true,
                        },
                    },
                },
            }
            if (category) {
                findObj.where = {
                    products: {
                        some: {
                            categories: {
                                some: {
                                    label: category,
                                },
                            },
                        },
                    },
                }
            }
            const tags = await this.db.tag.findMany(findObj)
            return tags
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.getCategories'
            )
        }
    }

    async createTag(userId, data: CreateTagDTO): Promise<TagRO> {
        try {
            if (data.images && data.images.length > 0) {
                data.images = {
                    connectOrCreate: data.images.map((item) => ({
                        create: {
                            fileType: item.fileType,
                            url: item.url,
                            meta: item.meta,
                            userId,
                        },
                        where: {
                            url: item.url,
                        },
                    })),
                } as any
            }

            const tags = await this.db.tag.create({
                data: data,
            })
            return tags
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.createTag'
            )
        }
    }

    async createTags(data: CreateTagDTO[]): Promise<Prisma.BatchPayload> {
        try {
            const tags = await this.db.tag.createMany({
                data: data,
            })
            return tags
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.createTags'
            )
        }
    }

    async updateTags(data: UpdateTagDTO[]): Promise<TagsRO> {
        try {
            // TODO: find beter way??
            const update = await Promise.all(
                data.map((tag) => {
                    return this.db.tag.update({
                        where: { label: tag.label },
                        data: {
                            label: tag.label,
                            value: tag.value,
                        },
                    })
                })
            )
            return update
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.updateTags'
            )
        }
    }

    async deleteTags(data: UpdateTagDTO[]): Promise<Prisma.BatchPayload> {
        try {
            const tags = await this.db.tag.deleteMany({
                where: {
                    label: { in: data.map((item) => item.label) },
                },
            })
            return tags
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TagService.deleteTags'
            )
        }
    }
}
