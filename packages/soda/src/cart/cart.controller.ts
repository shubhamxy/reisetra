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
  CreateOfferDto,
  DeleteOfferDto,
  GetAllCartsDto,
  UpdateCartItemDto,
  UpdateOfferDto,
} from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { Public } from "src/auth/decorator/public.decorator";
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
    @Query("promo") promo: string,
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.getCart(id, promo);
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
        "CartController.checkoutCart"
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

  @Public()
  @Get("offers")
  async getOffers(
    @Query("label") label: string,
    @Query("type") type: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.getOffers(label, type);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.getOffers"
      );
    }
  }

  @Post("offers")
  async createOffers(
    @Body() body: CreateOfferDto[]
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.createOffers(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.createOffers"
      );
    }
  }

  @Put("offers")
  async updateOffers(
    @Body() body: UpdateOfferDto[]
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.updateOffers(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.updateOffers"
      );
    }
  }

  @Delete("offers")
  async deleteOffers(
    @Body() body: DeleteOfferDto[]
  ): Promise<SuccessResponse> {
    try {
      const data = await this.cart.deleteOffers(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "CartController.deleteOffers"
      );
    }
  }
}
