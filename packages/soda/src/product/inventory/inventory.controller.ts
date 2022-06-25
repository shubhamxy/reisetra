/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { InventoryService } from './inventory.service'
import { AppError, errorCodes, Routes, SuccessResponse } from '@app/core'
import {
  CreateInventoryDTO,
  GetAllInventoryDTO,
  UpdateInventoryDTO,
} from './dto'
import { Role, Roles } from '@app/auth'

@Controller(Routes.inventories)
export class InventoryController {
  constructor(private readonly inventory: InventoryService) {}

  @Roles(Role.ADMIN)
  @Get(Routes.inventories_all)
  async getAllInventory(
    @Query() query: GetAllInventoryDTO
  ): Promise<SuccessResponse> {
    const { results, ...meta } = await this.inventory.getAllInventory(query)
    return { data: results || [], meta: meta }
  }

  @Get(Routes.inventories_by_id)
  async getProduct(@Param('id') inventoryId: string): Promise<SuccessResponse> {
    const data = await this.inventory.getInventory(inventoryId)
    return { data }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createProduct(
    @Body() body: CreateInventoryDTO
  ): Promise<SuccessResponse> {
    throw new AppError(
      'Cannot create inventory directly',
      errorCodes.InvalidRequest
    )
  }

  @Roles(Role.ADMIN)
  @Put(Routes.inventories_by_id)
  async updateProduct(
    @Param('id') inventoryId: string,
    @Body() body: UpdateInventoryDTO
  ): Promise<SuccessResponse> {
    const data = await this.inventory.updateInventory(inventoryId, body)
    return { data }
  }

  @Roles(Role.ADMIN)
  @Delete(Routes.inventories_by_id)
  async deleteProduct(
    @Param('id') inventoryId: string
  ): Promise<SuccessResponse> {
    const data = await this.inventory.deleteInventory(inventoryId)
    return { data }
  }
}
