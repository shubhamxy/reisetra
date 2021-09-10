import { Injectable } from '@nestjs/common'
import {
  CursorPaginationResultInterface,
  CustomError,
  errorCodes,
  OrderDirection,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import urlSlug from 'url-slug'
import {
  CreateProductDTO,
  GetAllProductsDTO,
  ProductSort,
  UpdateProductDTO,
} from './dto'
import type { Prisma } from '.prisma/client'
import { ProductRO } from './interfaces'
import { ProductsRO } from 'src/product/inventory/interfaces'

@Injectable()
export class ProductService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService
  ) {}

  async getAllProducts(
    options: GetAllProductsDTO
  ): Promise<CursorPaginationResultInterface<ProductRO>> {
    try {
      const whereObj: Prisma.ProductWhereInput = {}
      let {
        price,
        category,
        tags,
        brands,
        sort,
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = OrderDirection.asc,
        q,
        rating,
      } = options

      switch (sort) {
        case ProductSort.new: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.asc
          break
        }
        case ProductSort.bestSelling: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
        case ProductSort.relevant: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
        case ProductSort.trending: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
      }

      if (q) {
        whereObj.OR = [
          {
            title: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: q,
              mode: 'insensitive',
            },
          },
        ]
      }

      if (price) {
        whereObj.price = { gte: +price[0], lte: +price[1] }
      }

      if (tags) {
        whereObj.tags = {
          some: {
            OR: Array.isArray(tags)
              ? tags.map((t) => ({ label: t }))
              : [{ label: tags }],
          },
        }
      }

      if (brands) {
        whereObj.brand = {
          in: brands,
        }
      }

      if (category) {
        whereObj.categories = { some: { label: category } }
      }

      if (rating) {
        whereObj.rating = {
          gte: +rating,
        }
      }

      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'product',
        where: whereObj,
        include: {
          categories: true,
          tags: true,
          inventory: true,
          images: {
            select: {
              url: true,
            },
          },
        },
        prisma: this.db,
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.getAllProducts'
      )
    }
  }

  async getRecommendations(
    options: GetAllProductsDTO
  ): Promise<CursorPaginationResultInterface<ProductRO>> {
    try {
      const whereObj: any = {}
      let {
        price,
        category,
        tags,
        brands,
        sort,
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = OrderDirection.asc,
        q,
        rating,
      } = options

      switch (sort) {
        case ProductSort.new: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.asc
          break
        }
        case ProductSort.bestSelling: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
        case ProductSort.relevant: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
        case ProductSort.trending: {
          orderBy = 'updatedAt'
          orderDirection = OrderDirection.desc
          break
        }
      }

      if (q) {
        whereObj.OR = [
          {
            title: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: q,
              mode: 'insensitive',
            },
          },
        ]
      }

      if (price) {
        whereObj.price = { gte: +price[0], lte: +price[1] }
      }

      if (tags) {
        whereObj.tags = {
          some: {
            OR: Array.isArray(tags)
              ? tags.map((t) => ({ label: t }))
              : [{ label: tags }],
          },
        }
      }

      if (brands) {
        whereObj.brand = {
          in: brands,
        }
      }

      if (category) {
        whereObj.categories = { some: { label: category } }
      }

      if (rating) {
        whereObj.rating = {
          gte: +rating,
        }
      }

      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'product',
        where: whereObj,
        include: {
          categories: true,
          tags: true,
          inventory: true,
          images: {
            select: {
              url: true,
            },
          },
        },
        prisma: this.db,
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.getAllProducts'
      )
    }
  }

  async getProduct(slug: string): Promise<ProductRO> {
    const product = await this.db.product.findUnique({
      where: { slug },
      include: {
        tags: true,
        categories: true,
        inventory: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    })
    if (!product) {
      throw new CustomError(
        'Product does not exist',
        errorCodes.RecordDoesNotExist
      )
    }
    return product
  }

  async getProducts(options: GetAllProductsDTO): Promise<ProductsRO> {
    const { price, category, tags, rating, q } = options

    const whereObj: Prisma.ProductWhereInput = {}
    if (price) {
      whereObj.price = { gte: +price[0], lte: +price[1] }
    }

    if (tags) {
      whereObj.tags = {
        some: {
          OR: Array.isArray(tags)
            ? tags.map((t) => ({ label: t }))
            : [{ label: tags }],
        },
      }
    }

    if (category) {
      whereObj.categories = { some: { label: category } }
    }

    if (q) {
      whereObj.OR = [
        {
          title: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ]
    }

    if (rating) {
      whereObj.rating = {
        gt: +rating,
      }
    }

    const products = await this.db.product.findMany({
      where: {
        ...whereObj,
      },
      include: {
        tags: true,
        categories: true,
        inventory: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    })
    if (!products) {
      throw new CustomError(
        'Product does not exist',
        errorCodes.RecordDoesNotExist
      )
    }
    return products
  }

  async createProduct(
    userId: string,
    data: CreateProductDTO
  ): Promise<ProductRO> {
    try {
      const {
        inventory,
        brand,
        images,
        categories,
        tags,
        ...productData
      } = data
      const dataObj: Prisma.XOR<
        Prisma.ProductCreateInput,
        Prisma.ProductUncheckedCreateInput
      > = {
        ...productData,
        inventory: {
          create: inventory,
        },
        slug: productData.slug || urlSlug(productData.title),
      }

      if (brand) {
        dataObj.company = {
          connectOrCreate: {
            create: {
              name: brand,
            },
            where: {
              name: brand,
            },
          },
        }
      }

      if (images.length > 0) {
        dataObj.images = {
          connectOrCreate: images.map((item) => ({
            create: {
              url: item.url,
              contentType: 'image/png',
              fileType: 'images',
              userId,
            },
            where: {
              url: item.url,
            },
          })),
        }
      }

      if (tags.length > 0) {
        dataObj.tags = {
          connect: tags.map((tag) => ({ label: tag })),
        }
      }

      if (categories.length > 0) {
        dataObj.categories = {
          connect: categories.map((category) => ({
            label: category,
          })),
        }
      }
      return await this.db.product.create({
        data: dataObj,
        include: {
          categories: true,
          tags: true,
          inventory: true,
          images: {
            select: {
              url: true,
              meta: true,
            },
          },
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.findAllOffset'
      )
    }
  }

  async updateProduct(
    userId: string,
    slug: string,
    update: UpdateProductDTO
  ): Promise<ProductRO> {
    try {
      const { inventory, images, tags, categories, ...productData } = update

      const updateData: any = productData

      if (images && images.length > 0) {
        updateData.images = {
          connectOrCreate: images.map((item) => ({
            create: {
              url: item.url,
              fileType: item.fileType,
              meta: item.meta,
              userId,
            },
            where: {
              url: item.url,
            },
          })),
          update: images.map((item) => ({
            data: {
              url: item.url,
              fileType: item.fileType,
              meta: item.meta,
              userId,
            },
            where: {
              url: item.url,
            },
          })),
        }
      }

      if (inventory) {
        updateData.inventory = {
          update: inventory,
        }
      }
      if (tags) {
        updateData.tags = {
          set: tags?.map((tag) => ({ label: tag })),
        }
      }
      if (categories) {
        updateData.categories = {
          set: categories?.map((category) => ({ label: category })),
        }
      }

      const productUpdate: Prisma.XOR<
        Prisma.ProductUpdateArgs,
        Prisma.ProductUncheckedUpdateInput
      > = {
        where: { slug },
        data: updateData,
        include: {
          categories: true,
          tags: true,
          inventory: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      }
      return await this.db.product.update(productUpdate)
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.findAllOffset'
      )
    }
  }

  async deleteProduct(productId: string): Promise<ProductRO> {
    try {
      return await this.db.product.delete({
        where: { id: productId },
        include: {
          inventory: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'ProductService.findAllOffset'
      )
    }
  }
}
