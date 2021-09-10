import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { BrandService } from './brand.service'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import { CreateCompanyDTO } from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'

@Controller(ROUTES.brands)
export class BrandController {
  constructor(private readonly product: BrandService) {}

  @Public()
  @Get()
  async getBrands(
    @Query('category') category: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.getBrands(category)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.getBrands'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createBrand(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.createBrand'
      )
    }
  }

  @Put()
  async updateBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateBrand(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.updateBrand'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete()
  async deleteBrand(@Body() body: CreateCompanyDTO): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteBrand(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.deleteBrand'
      )
    }
  }
}
