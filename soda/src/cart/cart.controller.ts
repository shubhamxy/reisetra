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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CustomException, SuccessResponse } from 'src/common/response';
import { CheckoutDto, CreateCartItemDto, GetAllCartsDto, UpdateCartItemDto } from './dto';
import { AuthenticatedRequest } from 'src/auth/auth.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller()
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get('allCarts')
  async getAllCarts(
    @Query() query: GetAllCartsDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.cart.getAllCarts(query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.getAllCarts");
    }
  }

  @Get('cart')
  async getUserCart(
    @Query() query: GetAllCartsDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.cart.getUserCart(req.user.id, query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.getUserCart");
    }
  }


  @Post('cart')
  async createCartItem(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateCartItemDto,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.addCartItem(req.user.id, body.productId, body.quantity);
      return { data };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.getUserCart");
    }
  }

  @Post('cart/checkout')
  async checkoutCart(
    @Req() req: AuthenticatedRequest,
    @Body() body: CheckoutDto,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.checkoutCart(req.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.getUserCart");
    }
  }

  @Get('cart/:id')
  async getCartItem(
    @Param('id') id: string,
    @Body() body: UpdateCartItemDto,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.getCartItem(id);
      return { data };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.getCartItem");
    }
  }

  @Put('cart/:id')
  async updateCartItem(
    @Param('id') id: string,
    @Body() body: UpdateCartItemDto,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.updateCartItem(id, body);
      return { data };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.updateCartItem");
    }
  }

  @Delete('cart/:id')
  async deleteCartItem(
    @Param('id') id: string,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.removeCartItem(id);
      return { data };
    } catch (error) {
      throw new CustomException(error, HttpStatus.BAD_REQUEST, "CartController.deleteCartItem");
    }
  }
}
