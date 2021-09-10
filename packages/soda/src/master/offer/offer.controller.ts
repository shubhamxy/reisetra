/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { OfferService } from './offer.service'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import {
  CreateOfferDTO,
  DeleteOfferDTO,
  GetAllOffersDTO,
  UpdateOfferDTO,
} from './dto'
import { Role, Roles } from '@app/auth'

@Controller(ROUTES.offers)
export class OfferController {
  constructor(private readonly offer: OfferService) {}

  @Get()
  async getOffers(@Query() query: GetAllOffersDTO): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.offer.getOffers(query)
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CartController.getOffers'
      )
    }
  }

  @Post()
  async createOffers(@Body() body: CreateOfferDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.offer.createOffers(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CartController.createOffers'
      )
    }
  }

  @Put()
  async updateOffers(@Body() body: UpdateOfferDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.offer.updateOffers(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CartController.updateOffers'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete()
  async deleteOffers(@Body() body: DeleteOfferDTO[]): Promise<SuccessResponse> {
    try {
      const data = await this.offer.deleteOffers(body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'CartController.deleteOffers'
      )
    }
  }
}
