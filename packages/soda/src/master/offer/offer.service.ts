import { Injectable } from '@nestjs/common'
import { CustomError } from '@app/core'
import { DbService } from '@app/db'
import { prismaOffsetPagination } from '@app/utils'
import {
  CreateOfferDTO,
  DeleteOfferDTO,
  GetAllOffersDTO,
  UpdateOfferDTO,
} from './dto'

@Injectable()
export class OfferService {
  constructor(private readonly db: DbService) {}

  async getOffers(params: GetAllOffersDTO): Promise<any> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = params
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'offer',
        prisma: this.db,
        id: 'label',
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.getOffers'
      )
    }
  }

  async createOffers(data: CreateOfferDTO[]): Promise<any> {
    try {
      const offers = await this.db.offer.createMany({
        data: data,
      })
      return offers
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.findAllOffset'
      )
    }
  }

  async updateOffers(data: UpdateOfferDTO[]): Promise<any> {
    try {
      // TODO: find beter way??
      const update = await Promise.all(
        data.map((offer) => {
          return this.db.offer.update({
            where: { label: offer.label },
            data: {
              value: offer.value,
            },
          })
        })
      )
      return update
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.updateCategories'
      )
    }
  }

  async deleteOffers(data: DeleteOfferDTO[]): Promise<any> {
    try {
      const deleted = await this.db.offer.updateMany({
        where: {
          label: { in: data.map((item) => item.label) },
        },
        data: {
          active: false,
        },
      })
      return deleted
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'CartService.deleteTags'
      )
    }
  }
}
