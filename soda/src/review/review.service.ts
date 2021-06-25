import { Product } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import { CursorPaginationResultInterface } from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CreateReviewDto, GetAllReviewsDto, UpdateReviewDto } from "./dto";
import { OrderDirection } from "../common/dto";
@Injectable()
export class ReviewService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: CacheService
  ) {}

  async getAllReviews(
    productId: string,
    options: GetAllReviewsDto
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      let {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = OrderDirection.asc,
      } = options;

      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "review",
        where: {
          productId,
        },
        include: {
          images: true,
        },
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ReviewService.getAllReviews"
      );
    }
  }

  async getReview(reviewId: string): Promise<any> {
    try {
      const review = await this.db.review.findUnique({
        where: { id: reviewId },
        include: {
          images: true,
        },
      });
      if (!review) {
        throw new CustomError(
          "Review does not exist",
          errorCodes.RecordDoesNotExist
        );
      }
      return review;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ReviewService.getReview"
      );
    }
  }

  async getReviews(productId: string): Promise<any> {
    const products = await this.db.review.findMany({
      where: {
        productId,
      },
      include: {
        images: true,
      },
    });
    if (!products) {
      throw new CustomError(
        "Product does not exist",
        errorCodes.RecordDoesNotExist
      );
    }
    return products;
  }

  async createReview(userId: string, data: CreateReviewDto): Promise<any> {
    try {
      const { productId, images, title, description, rating } = data;
      const product = await this.db.review.create({
        data: {
          images: {
            createMany: {
              data: images.map((item) => ({ ...item, userId })),
            },
          },
          title: title,
          description: description,
          productId,
          rating: rating,
        },
        include: {
          images: true,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ReviewService.createReview"
      );
    }
  }

  async updateReview(
    userId: string,
    reviewId: string,
    data: UpdateReviewDto
  ): Promise<any> {
    try {
      const { productId, images, title, description, rating } = data;
      const review = await this.db.review.update({
        where: { id: reviewId },
        data: {
          images: {
            createMany: {
              data: images.map((item) => ({ ...item, userId })),
            },
          },
          productId,
          title,
          description,
        },
        include: {
          images: true,
        },
      });
      return review;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ReviewService.updateReview"
      );
    }
  }

  async deleteReview(reviewId: string): Promise<any> {
    try {
      const data = await this.db.review.delete({
        where: { id: reviewId },
        include: {
          images: true,
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ReviewService.deleteReview"
      );
    }
  }
}
