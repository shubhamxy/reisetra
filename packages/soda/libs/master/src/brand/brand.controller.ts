import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { BrandService } from './brand.service'
import { Message, Routes, SuccessResponse } from '@app/core'
import { CreateCompanyDTO } from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'
import { CATEGORY } from '@app/master/brand/brand.const'
import { ExceptionHandler } from '@app/core/decorators'

@Controller(Routes.brands)
export class BrandController {
  constructor(private readonly product: BrandService) {}

  @Public()
  @Get()
  @ExceptionHandler()
  async getBrands(@Query(CATEGORY) category: string): Promise<SuccessResponse> {
    const data = await this.product.getBrands(category)
    return { data, message: Message.success }
  }

  @Roles(Role.ADMIN)
  @Post()
  @ExceptionHandler()
  async createBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDTO
  ): Promise<SuccessResponse> {
    const data = await this.product.createBrand(body)
    return { data, message: Message.created }
  }

  @Put()
  @ExceptionHandler()
  async updateBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDTO
  ): Promise<SuccessResponse> {
    const data = await this.product.updateBrand(body)
    return { data, message: Message.updated }
  }

  @Roles(Role.ADMIN)
  @Delete()
  @ExceptionHandler()
  async deleteBrand(@Body() body: CreateCompanyDTO): Promise<SuccessResponse> {
    const data = await this.product.deleteBrand(body)
    return { data, message: Message.success }
  }
}
