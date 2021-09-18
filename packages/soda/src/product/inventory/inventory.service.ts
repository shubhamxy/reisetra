import { Product } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  CustomError,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import { CreateInventoryDTO } from './dto'

@Injectable()
export class InventoryService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService
  ) {}

  async getAllInventory(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc',
    } = options
    try {
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        include: {
          product: true,
        },
        model: 'inventory',
        prisma: this.db,
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'InventoryService.getAllInventory'
      )
    }
  }

  async getInventory(id: string): Promise<any> {
    try {
      const product = await this.db.inventory.findUnique({
        where: { id },
        include: {
          product: true,
        },
      })
      return product
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'InventoryService.getInventory'
      )
    }
  }

  async createInventory(data: CreateInventoryDTO): Promise<any> {
    try {
      const product = await this.db.inventory.create({
        data,
        include: {
          product: true,
        },
      })
      return product
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'InventoryService.createInventory'
      )
    }
  }

  async updateInventory(id: string, data): Promise<any> {
    try {
      const updated = await this.db.inventory.update({
        where: { id },
        data,
        include: {
          product: true,
        },
      })
      return updated
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'InventoryService.updateInventory'
      )
    }
  }

  async deleteInventory(id: string): Promise<any> {
    try {
      const data = await this.db.inventory.delete({ where: { id } })
      return data
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'InventoryService.deleteInventory'
      )
    }
  }
}
