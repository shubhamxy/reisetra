import type { Prisma } from '@prisma/client'
import { Product } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import {
  CursorPaginationResultInterface,
  AppError,
  errorCodes,
  OrderDirection,
} from '@app/core'
import { CacheService } from '@app/cache'
import { DbService } from '@app/db'
import { prismaOffsetPagination } from '@app/utils'
import { CreateReviewDTO, GetAllReviewsDTO, UpdateReviewDTO } from './dto'

@Injectable()
export class ReviewService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService
  ) {}

  async getAllReviews(
    productId: string,
    options: GetAllReviewsDTO
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
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
        model: 'review',
        where: {
          productId,
          active: true,
          published: true,
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              avatar: true,
              name: true,
            },
          },
        },
        prisma: this.db,
      })
      return result
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ReviewService.getAllReviews'
      )
    }
  }

  async getReview(reviewId: string): Promise<any> {
    try {
      const review = await this.db.review.findUnique({
        where: { id: reviewId },
        include: {
          images: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              avatar: true,
              name: true,
            },
          },
        },
      })
      if (!review) {
        throw new AppError(
          'Review does not exist',
          errorCodes.RecordDoesNotExist
        )
      }
      return review
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ReviewService.getReview'
      )
    }
  }

  async getReviews(productId: string): Promise<any> {
    const products = await this.db.review.findMany({
      where: {
        productId,
        active: true,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        user: {
          select: {
            avatar: true,
            name: true,
          },
        },
      },
    })
    if (!products) {
      throw new AppError(
        'Product does not exist',
        errorCodes.RecordDoesNotExist
      )
    }
    return products
  }

  async createReview(userId: string, data: CreateReviewDTO): Promise<any> {
    try {
      const { productId, images, title, description, rating, published } = data
      const dataObj: Prisma.XOR<
        Prisma.ReviewCreateInput,
        Prisma.ReviewUncheckedCreateInput
      > = {
        userId,
        title,
        description,
        productId,
        rating: +rating,
        published,
      }

      if (images && images.length > 0) {
        dataObj.images = {
          connectOrCreate: images.map((item) => ({
            create: {
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

      const product = await this.db.review.create({
        data: dataObj,
        include: {
          images: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              avatar: true,
              name: true,
            },
          },
        },
      })

      const ratings = await this.db.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          _all: true,
        },
        where: {
          productId: productId,
        },
      })

      await this.db.product.update({
        where: {
          id: productId,
        },
        data: {
          rating: Math.round(ratings._avg.rating),
          ratingsCount: ratings._count._all,
        },
      })
      return product
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ReviewService.createReview'
      )
    }
  }

  async updateReview(
    userId: string,
    reviewId: string,
    data: UpdateReviewDTO
  ): Promise<any> {
    try {
      const { productId, images, title, description, rating, published } = data
      const dataObj: Prisma.XOR<
        Prisma.ReviewCreateInput,
        Prisma.ReviewUncheckedCreateInput
      > = {
        rating: +rating,
        productId,
        title,
        description,
        published,
      }
      if (images && images.length > 0) {
        dataObj.images = {
          connectOrCreate: images.map((item) => ({
            create: {
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
      const review = await this.db.review.update({
        where: { id: reviewId },
        data: dataObj,
        include: {
          images: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              avatar: true,
              name: true,
            },
          },
        },
      })
      const ratings = await this.db.review.aggregate({
        _avg: {
          rating: true,
        },
        _count: {
          _all: true,
        },
        where: {
          productId: productId,
        },
      })

      await this.db.product.update({
        where: {
          id: productId,
        },
        data: {
          rating: Math.round(ratings._avg.rating),
          ratingsCount: ratings._count._all,
        },
      })
      return review
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ReviewService.updateReview'
      )
    }
  }

  async deleteReview(reviewId: string): Promise<any> {
    try {
      const data = await this.db.review.update({
        where: { id: reviewId },
        data: {
          active: false,
        },
        include: {
          images: {
            select: {
              url: true,
            },
          },
          user: {
            select: {
              avatar: true,
              name: true,
            },
          },
        },
      })
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'ReviewService.deleteReview'
      )
    }
  }
}
