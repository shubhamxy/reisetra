import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Routes, SuccessResponse } from '@app/core'
import { CreateCategoryDTO } from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'
import { ExceptionHandler } from '@app/core/decorators'

@Controller(Routes.categories)
export class CategoryController {
  constructor(private readonly category: CategoryService) {}

  @Public()
  @Get()
  @ExceptionHandler()
  async getCategories(): Promise<SuccessResponse> {
    const data = await this.category.getCategories()
    return { data }
  }

  @Roles(Role.ADMIN)
  @Post()
  @ExceptionHandler()
  async createCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO[]
  ): Promise<SuccessResponse> {
    const data = await this.category.createCategories(request.user.id, body)
    return { data }
  }

  @Roles(Role.ADMIN)
  @Put()
  @ExceptionHandler()
  async updateCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO
  ): Promise<SuccessResponse> {
    const data = await this.category.updateCategories(request.user.id, body)
    return { data }
  }

  @Roles(Role.ADMIN)
  @Delete()
  @ExceptionHandler()
  async deleteCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDTO
  ): Promise<SuccessResponse> {
    const data = await this.category.deleteCategory(request.user.id, body)
    return { data }
  }
}
