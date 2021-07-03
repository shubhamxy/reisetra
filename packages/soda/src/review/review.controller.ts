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
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CustomException, SuccessResponse } from "src/common/response";
import { CreateReviewDto, GetAllReviewsDto, UpdateReviewDto } from "./dto";
import { Public } from "src/auth/decorator/public.decorator";
import { AuthenticatedRequest } from "src/auth/auth.interface";
@Controller()
export class ReviewController {
  constructor(private readonly review: ReviewService) {}

  @Public()
  @Get("reviews/:productId")
  async getAllReviews(
    @Param("productId") productId: string,
    @Query() query: GetAllReviewsDto
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.review.getAllReviews(productId, query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ReviewController.getAllReviews"
      );
    }
  }

  @Public()
  @Get("review/:reviewId")
  async getReview(
    @Param("reviewId") reviewId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.getReview(reviewId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ReviewController.getReview"
      );
    }
  }

  @Post("review")
  async createReview(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateReviewDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.createReview(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ReviewController.createReview"
      );
    }
  }

  @Put("review/:reviewId")
  async updateReview(
    @Req() request: AuthenticatedRequest,
    @Param("reviewId") reviewId: string,
    @Body() body: UpdateReviewDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.updateReview(request.user.id, reviewId, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ReviewController.updateReview"
      );
    }
  }

  @Delete("review/:reviewId")
  async deleteReview(
    @Param("reviewId") reviewId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.review.deleteReview(reviewId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ReviewController.deleteReview"
      );
    }
  }
}
