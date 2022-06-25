import { Injectable } from '@nestjs/common'
import { AppError } from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto'
import type { Prisma } from '@prisma/client'
import { CategoriesRO, CategoryRO } from './interfaces'
import { ErrorHandler } from '@app/core/decorators'

@Injectable()
export class CategoryService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService
  ) {}

  @ErrorHandler()
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
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.getCategories'
      )
    }
  }

  @ErrorHandler()
  async createCategory(
    userId: string,
    data: CreateCategoryDTO
  ): Promise<CategoryRO> {
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
    return await this.db.category.create({
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
  }

  @ErrorHandler()
  async createCategories(
    userId: string,
    data: CreateCategoryDTO[]
  ): Promise<CategoriesRO> {
    return await Promise.all(
      data.map((item) => this.createCategory(userId, item))
    )
  }

  @ErrorHandler()
  async updateCategory(
    userId: string,
    data: UpdateCategoryDTO
  ): Promise<CategoryRO> {
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
    return await this.db.category.update({
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
  }

  @ErrorHandler()
  async updateCategories(
    userId: string,
    data: UpdateCategoryDTO
  ): Promise<CategoryRO> {
    const { images, ...rest } = data
    const imageData = images.map((item) => ({ ...item, userId }))
    return await this.db.category.update({
      where: { label: data.label },
      data: {
        ...rest,
        images: {
          createMany: { data: imageData },
        },
      },
    })
  }

  @ErrorHandler()
  async deleteCategory(
    userId: string,
    data: CreateCategoryDTO
  ): Promise<CategoryRO> {
    return await this.db.category.update({
      where: {
        label: data.label,
      },
      data: {
        active: false,
      },
    })
  }
}
