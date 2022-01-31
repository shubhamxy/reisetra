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
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import {
    CreateOrderDTO,
    GetAllOrdersDocumentsDTO,
    GetAllOrdersDTO,
    UpdateOrderDTO,
} from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles, Role } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/constants'
@Controller(ROUTES.orders)
export class OrderController {
    constructor(private readonly order: OrderService) {}
    @Get(ROUTES.orders_all)
    async getAllOrders(
        @Req() request: AuthenticatedRequest,
        @Query() query: GetAllOrdersDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getAllOrders(query)
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.getAllOrders'
            )
        }
    }

    @Get()
    async getUserOrders(
        @Req() request: AuthenticatedRequest,
        @Query() query: GetAllOrdersDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getUserOrders(
                request.user.id,
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.getUserOrders'
            )
        }
    }

    @Get(ROUTES.orders_by_orderId)
    async getOrder(
        @Param('orderId') orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.getOrder(orderId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.getOrder'
            )
        }
    }

    @Get(ROUTES.orders_by_orderId_documents)
    async getOrderDocuments(
        @Param('orderId') orderId: string,
        @Query() query: GetAllOrdersDocumentsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.order.getOrderDocuments(
                orderId,
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.getOrderInvoice'
            )
        }
    }

    @Post()
    async createOrder(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateOrderDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.createOrder(request.user.id, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.createOrder'
            )
        }
    }

    @Put(ROUTES.orders_by_orderId)
    async updateOrder(
        @Req() request: AuthenticatedRequest,
        @Param('orderId') orderId: string,
        @Body() body: UpdateOrderDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.updateOrder(
                orderId,
                body,
                request.user.id
            )
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.updateOrder'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Delete(ROUTES.orders_by_orderId)
    async deleteOrder(
        @Param('orderId') orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.deleteOrder(orderId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.deleteOrder'
            )
        }
    }

    @Put(ROUTES.orders_by_orderId_cancel)
    async cancelOrder(
        @Param('orderId') orderId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.order.cancelOrder(orderId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'OrderController.cancelOrder'
            )
        }
    }
}
