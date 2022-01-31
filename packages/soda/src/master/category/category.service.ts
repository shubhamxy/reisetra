import { Injectable } from '@nestjs/common'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { CacheService } from 'src/core/modules/cache/cache.service'
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto'
import type { Prisma } from '.prisma/client'
import { CategoriesRO, CategoryRO } from './interfaces'

@Injectable()
export class CategoryService {
    constructor(
        private readonly db: PrismaService,
        private readonly cache: CacheService
    ) {}

    async getCategories(): Promise<CategoriesRO> {
        try {
            const categories = await this.db.category.findMany({
                include: {
                    images: {
                        select: {
                            url: true,
                        },
                    },
                },
                take: 20,
            })
            return categories
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.getCategories'
            )
        }
    }

    async createCategory(
        userId: string,
        data: CreateCategoryDTO
    ): Promise<CategoryRO> {
        try {
            const { images, ...rest } = data

            const dataObj: Prisma.XOR<
                Prisma.CategoryCreateInput,
                Prisma.CategoryUncheckedCreateInput
            > = {
                label: rest.label,
                value: rest.value,
            }

            if (images && images.length > 0) {
                dataObj.images = {
                    connectOrCreate: images.map((item) => ({
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
                }
            }

            if (data.styles) {
                dataObj.styles = rest.styles
            }
            const category = await this.db.category.create({
                data: dataObj,
                include: {
                    images: {
                        select: {
                            url: true,
                            meta: true,
                        },
                    },
                },
            })
            return category
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.findAllOffset'
            )
        }
    }

    async createCategories(
        userId: string,
        data: CreateCategoryDTO[]
    ): Promise<CategoriesRO> {
        try {
            const results = await Promise.all(
                data.map((item) => this.createCategory(userId, item))
            )
            return results
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.findAllOffset'
            )
        }
    }

    async updateCategory(
        userId: string,
        data: UpdateCategoryDTO
    ): Promise<CategoryRO> {
        try {
            const { images, ...rest } = data

            const dataObj: Prisma.XOR<
                Prisma.CategoryCreateInput,
                Prisma.CategoryUncheckedCreateInput
            > = {
                label: rest.label,
                value: rest.value,
            }
            if (images && images.length > 0) {
                dataObj.images = {
                    connectOrCreate: images.map((item) => ({
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
                }
            }
            if (data.styles) {
                dataObj.styles = rest.styles
            }
            const category = await this.db.category.update({
                where: {
                    label: data.label,
                },
                data: dataObj,
                include: {
                    images: {
                        select: {
                            url: true,
                            meta: true,
                        },
                    },
                },
            })
            return category
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.findAllOffset'
            )
        }
    }

    async updateCategories(
        userId: string,
        data: UpdateCategoryDTO
    ): Promise<CategoryRO> {
        try {
            const { images, ...rest } = data
            const imageData = images.map((item) => ({ ...item, userId }))
            const categories = await this.db.category.update({
                where: { label: data.label },
                data: {
                    ...rest,
                    images: {
                        createMany: { data: imageData },
                    },
                },
            })
            return categories
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.updateCategories'
            )
        }
    }

    async deleteCategory(
        userId: string,
        data: CreateCategoryDTO
    ): Promise<CategoryRO> {
        try {
            const deleted = await this.db.category.update({
                where: {
                    label: data.label,
                },
                data: {
                    active: false,
                },
            })
            return deleted
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'ProductService.deleteTags'
            )
        }
    }
}
