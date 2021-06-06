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
import { CartService } from "./cart.service";
import { CustomException, SuccessResponse } from "src/common/response";
import {
  CheckoutDto,
  GetAllCartsDto,
  UpdateCartItemDto,
} from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";
@Controller()
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get("allCarts")
  async getAllCarts(
    @Query() query: GetAllCartsDto,
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.cart.getAllCarts(query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.getAllCarts"
      );
    }
  }

  @Get("cart/:id")
  async getUserCart(
    @Param("id") id: string,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.getCart(id);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.getUserCart"
      );
    }
  }

  @Post("cart/checkout")
  async checkoutCart(
    @Req() req: AuthenticatedRequest,
    @Body() body: CheckoutDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.checkoutCart(req.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.getUserCart"
      );
    }
  }

  @Get("cart/:cartid/:productid")
  async getCartItem(
    @Param("cartid") cartid: string,
    @Param("productid") productid: string,
    @Body() body: UpdateCartItemDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.getCartItem(cartid, productid);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.getCartItem"
      );
    }
  }

  @Put("cart/:cartId/:productId")
  async updateCartItem(
    @Param("cartId") cartId: string,
    @Param("productId") productId: string,
    @Body() update: UpdateCartItemDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.updateCart(cartId, productId, update);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.updateCartItem"
      );
    }
  }

  @Delete("cart/:cartId/:productId")
  async deleteCartItem(@Param("cartId") cartId: string, @Param("productId") productId: string): Promise<SuccessResponse> {
    try {
      const data = await this.cart.removeCartItem(cartId, productId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.deleteCartItem"
      );
    }
  }
}
