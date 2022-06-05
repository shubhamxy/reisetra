import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import { CreateCategoryDTO } from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'

@Controller(ROUTES.categories)
export class CategoryController {
  constructor(private readonly category: CategoryService) {}

  @Public()
  @Get()
  async getCategories(): Promise<SuccessResponse> {
    try {
      const data = await this.category.getCategories()
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CategoryController.getCategories'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO[]
  ): Promise<SuccessResponse> {
    try {
      const data = await this.category.createCategories(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CategoryController.createCategories'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put()
  async updateCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.category.updateCategories(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CategoryController.updateCategories'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete()
  async deleteCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.category.deleteCategory(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CategoryController.deleteCategories'
      )
    }
  }
}