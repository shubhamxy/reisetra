import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { TagService } from './tag.service'
import { CustomException, Routes, SuccessResponse } from '@app/core'
import { CreateTagDTO, GetAllTagsDTO, UpdateTagDTO } from './dto'
import { Public, Role, Roles } from '@app/auth'

@Controller(Routes.tags)
export class TagController {
  constructor(private readonly product: TagService) {}

  @Public()
  @Get(Routes.tags_all)
  async getAllTags(@Query() query: GetAllTagsDTO): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.product.getAllTags(query)
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.getTags'
      )
    }
  }

  @Public()
  @Get()
  async getTags(@Query('category') category: string): Promise<SuccessResponse> {
    try {
      const data = await this.product.getTags(category)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.getTags'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createTags(@Body() body: CreateTagDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.product.createTags(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.createTag'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put()
  async updateTags(@Body() body: UpdateTagDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateTags(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.updateTags'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put()
  async deleteTags(@Body() body: UpdateTagDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteTags(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'ProductController.deleteTags'
      )
    }
  }
}
