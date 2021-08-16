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
} from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { CustomError, SuccessResponse } from "src/common/response";
import {
    CreateInventoryDto,
    GetAllInventoryDto,
    UpdateInventoryDto,
} from "./dto";
import { errorCodes } from "src/common/codes/error";
import { Roles } from "src/auth/decorator/roles.decorator";

@Controller()
export class InventoryController {
    constructor(private readonly inventory: InventoryService) {}

    @Get("allInventory")
    async getAllInventory(
        @Query() query: GetAllInventoryDto
    ): Promise<SuccessResponse> {
        const { results, ...meta } = await this.inventory.getAllInventory(
            query
        );
        return { data: results || [], meta: meta };
    }

    @Get("inventory/:id")
    async getProduct(
        @Param("id") inventoryId: string
    ): Promise<SuccessResponse> {
        const data = await this.inventory.getInventory(inventoryId);
        return { data };
    }

    @Post("inventory")
    async createProduct(
        @Body() body: CreateInventoryDto
    ): Promise<SuccessResponse> {
        throw new CustomError(
            "Cannot create inventory directly",
            errorCodes.InvalidRequest
        );
    }

    @Put("inventory/:id")
    async updateProduct(
        @Param("id") inventoryId: string,
        @Body() body: UpdateInventoryDto
    ): Promise<SuccessResponse> {
        const data = await this.inventory.updateInventory(inventoryId, body);
        return { data };
    }

    @Roles("ADMIN")
    @Delete("inventory/:id")
    async deleteProduct(
        @Param("id") inventoryId: string
    ): Promise<SuccessResponse> {
        const data = await this.inventory.deleteInventory(inventoryId);
        return { data };
    }
}
