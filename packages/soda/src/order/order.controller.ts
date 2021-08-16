import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CustomException, SuccessResponse } from "src/common/response";
import {
    CreateOrderDto,
    GetAllOrdersDocumentsDto,
    GetAllOrdersDto,
    UpdateOrderDto,
} from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { Roles } from "src/auth/decorator/roles.decorator";
@Controller()
export class OrderController {
    constructor(private readonly order: OrderService) {}
    @Get("orders/all")
    async getAllOrders(
        @Req() request: AuthenticatedRequest,
        @Query() query: GetAllOrdersDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getAllOrders(query);
            return { data: results || [], meta: meta };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.getAllOrders"
            );
        }
    }

    @Get("orders")
    async getUserOrders(
        @Req() request: AuthenticatedRequest,
        @Query() query: GetAllOrdersDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getUserOrders(
                request.user.id,
                query
            );
            return { data: results || [], meta: meta };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.getUserOrders"
            );
        }
    }

    @Get("order/:orderId")
    async getOrder(
        @Param("orderId") orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.getOrder(orderId);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.getOrder"
            );
        }
    }

    @Get("order/:orderId/documents")
    async getOrderDocuments(
        @Param("orderId") orderId: string,
        @Query() query: GetAllOrdersDocumentsDto
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getOrderDocuments(
                orderId,
                query
            );
            return { data: results || [], meta: meta };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.getOrderInvoice"
            );
        }
    }

    @Post("order")
    async createOrder(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateOrderDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.createOrder(request.user.id, body);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.createOrder"
            );
        }
    }

    @Put("order/:orderId")
    async updateOrder(
        @Req() request: AuthenticatedRequest,
        @Param("orderId") orderId: string,
        @Body() body: UpdateOrderDto
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.updateOrder(
                orderId,
                body,
                request.user.id
            );
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.updateOrder"
            );
        }
    }

    @Roles("ADMIN")
    @Delete("order/:orderId")
    async deleteOrder(
        @Param("orderId") orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.deleteOrder(orderId);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.deleteOrder"
            );
        }
    }

    @Put("order/:orderId/cancel")
    async cancelOrder(
        @Param("orderId") orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.cancelOrder(orderId);
            return { data };
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                "OrderController.cancelOrder"
            );
        }
    }
}
