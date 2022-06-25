import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Message, Routes, SuccessResponse } from '@app/core'
import { CheckoutDTO, GetAllCartsDTO, UpdateCartItemDTO } from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'
import { ExceptionHandler } from '@app/core/decorators'
import { CART_ID, PRODUCT_ID, PROMO } from '@app/user/user.const'

@Controller(Routes.carts)
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Roles(Role.ADMIN)
  @Get(Routes.carts_all)
  @ExceptionHandler()
  async getAllCarts(@Query() query: GetAllCartsDTO): Promise<SuccessResponse> {
    const { results, ...meta } = await this.cart.getAllCarts(query)
    return { data: results || [], meta: meta, message: Message.success }
  }

  @Post()
  @ExceptionHandler()
  async checkoutCart(
    @Req() req: AuthenticatedRequest,
    @Body() body: CheckoutDTO
  ): Promise<SuccessResponse> {
    const data = await this.cart.checkoutCart(req.user.username, body)
    return { data }
  }

  @Get(Routes.carts_by_cartId)
  @ExceptionHandler()
  async getUserCart(
    @Param(CART_ID) cartId: string,
    @Query(PROMO) promo: string
  ): Promise<SuccessResponse> {
    const data = await this.cart.getCart(cartId, promo)
    return { data, message: Message.success }
  }

  @Get(Routes.carts_by_cartId_and_productId)
  @ExceptionHandler()
  async getCartItem(
    @Param(CART_ID) cartId: string,
    @Param(PRODUCT_ID) productId: string,
    @Body() body: UpdateCartItemDTO
  ): Promise<SuccessResponse> {
    const data = await this.cart.getCartItem(cartId, productId)
    return { data, message: Message.success }
  }

  @Put(Routes.carts_by_cartId_and_productId)
  @ExceptionHandler()
  async updateCartItem(
    @Param(CART_ID) cartId: string,
    @Param(PRODUCT_ID) productId: string,
    @Body() update: UpdateCartItemDTO
  ): Promise<SuccessResponse> {
    const data = await this.cart.updateCart(cartId, productId, update)
    return { data, message: Message.success }
  }

  @Delete(Routes.carts_by_cartId_and_productId)
  @ExceptionHandler()
  async deleteCartItem(
    @Param(CART_ID) cartId: string,
    @Param(PRODUCT_ID) productId: string
  ): Promise<SuccessResponse> {
    const data = await this.cart.removeCartItem(cartId, productId)
    return { data, message: Message.success }
  }
}
