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
import { CustomError, SuccessResponse } from 'src/core/response'
import {
    CreateInventoryDTO,
    GetAllInventoryDTO,
    UpdateInventoryDTO,
} from './dto'
import { errorCodes } from 'src/core/codes/error'
import { Roles, Role } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/core/constants'

@Controller(ROUTES.inventories)
export class InventoryController {
    constructor(private readonly inventory: InventoryService) {}

    @Roles(Role.ADMIN)
    @Get(ROUTES.inventories_all)
    async getAllInventory(
        @Query() query: GetAllInventoryDTO
    ): Promise<SuccessResponse> {
        const { results, ...meta } = await this.inventory.getAllInventory(query)
        return { data: results || [], meta: meta }
    }

    @Get(ROUTES.inventories_by_id)
    async getProduct(
        @Param('id') inventoryId: string
    ): Promise<SuccessResponse> {
        const data = await this.inventory.getInventory(inventoryId)
        return { data }
    }

    @Roles(Role.ADMIN)
    @Post()
    async createProduct(
        @Body() body: CreateInventoryDTO
    ): Promise<SuccessResponse> {
        throw new CustomError(
            'Cannot create inventory directly',
            errorCodes.InvalidRequest
        )
    }

    @Roles(Role.ADMIN)
    @Put(ROUTES.inventories_by_id)
    async updateProduct(
        @Param('id') inventoryId: string,
        @Body() body: UpdateInventoryDTO
    ): Promise<SuccessResponse> {
        const data = await this.inventory.updateInventory(inventoryId, body)
        return { data }
    }

    @Roles(Role.ADMIN)
    @Delete(ROUTES.inventories_by_id)
    async deleteProduct(
        @Param('id') inventoryId: string
    ): Promise<SuccessResponse> {
        const data = await this.inventory.deleteInventory(inventoryId)
        return { data }
    }
}
