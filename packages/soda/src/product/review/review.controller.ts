import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { CustomException, Routes, SuccessResponse } from '@app/core'
import { CreateReviewDTO, GetAllReviewsDTO, UpdateReviewDTO } from './dto'
import { AuthenticatedRequest, Public } from '@app/auth'

@Controller(Routes.reviews)
export class ReviewController {
  constructor(private readonly review: ReviewService) {}

  @Public()
  @Get(Routes.reviews_by_productId)
  async getAllReviews(
    @Param('productId') productId: string,
    @Query() query: GetAllReviewsDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.review.getAllReviews(
        productId,
        query
      )
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ReviewController.getAllReviews'
      )
    }
  }

  @Post()
  async createReview(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateReviewDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.createReview(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ReviewController.createReview'
      )
    }
  }

  @Public()
  @Get(Routes.reviews_by_reviewId)
  async getReview(
    @Param('reviewId') reviewId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.getReview(reviewId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ReviewController.getReview'
      )
    }
  }

  @Put(Routes.reviews_by_reviewId)
  async updateReview(
    @Req() request: AuthenticatedRequest,
    @Param('reviewId') reviewId: string,
    @Body() body: UpdateReviewDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.updateReview(
        request.user.id,
        reviewId,
        body
      )
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ReviewController.updateReview'
      )
    }
  }

  @Delete(Routes.reviews_by_reviewId)
  async deleteReview(
    @Param('reviewId') reviewId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.deleteReview(reviewId)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ReviewController.deleteReview'
      )
    }
  }
}
