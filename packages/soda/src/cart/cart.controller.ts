/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CartService } from './cart.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import { CheckoutDTO, GetAllCartsDTO, UpdateCartItemDTO } from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles, Role } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/constants'
@Controller(ROUTES.carts)
export class CartController {
    constructor(private readonly cart: CartService) {}

    @Roles(Role.ADMIN)
    @Get(ROUTES.carts_all)
    async getAllCarts(
        @Query() query: GetAllCartsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.cart.getAllCarts(query)
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.getAllCarts'
            )
        }
    }

    @Post()
    async checkoutCart(
        @Req() req: AuthenticatedRequest,
        @Body() body: CheckoutDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.cart.checkoutCart(req.user.id, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.checkoutCart'
            )
        }
    }

    @Get(ROUTES.carts_by_cartId)
    async getUserCart(
        @Param('cartId') cartId: string,
        @Query('promo') promo: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.cart.getCart(cartId, promo)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.getUserCart'
            )
        }
    }

    @Get(ROUTES.carts_by_cartId_and_productId)
    async getCartItem(
        @Param('cartid') cartid: string,
        @Param('productid') productid: string,
        @Body() body: UpdateCartItemDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.cart.getCartItem(cartid, productid)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.getCartItem'
            )
        }
    }

    @Put(ROUTES.carts_by_cartId_and_productId)
    async updateCartItem(
        @Param('cartId') cartId: string,
        @Param('productId') productId: string,
        @Body() update: UpdateCartItemDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.cart.updateCart(cartId, productId, update)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.updateCartItem'
            )
        }
    }

    @Delete(ROUTES.carts_by_cartId_and_productId)
    async deleteCartItem(
        @Param('cartId') cartId: string,
        @Param('productId') productId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.cart.removeCartItem(cartId, productId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'CartController.deleteCartItem'
            )
        }
    }
}
