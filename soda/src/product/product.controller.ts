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
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CustomException, SuccessResponse } from "src/common/response";
import { CreateProductDto, GetAllProductsDto, UpdateProductDto } from "./dto";
import { Public } from "src/auth/decorator/public.decorator";
@Controller()
export class ProductController {
  constructor(private readonly product: ProductService) {}

  @Public()
  @Get("products")
  async getAllProducts(
    @Query() query: GetAllProductsDto
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.product.getAllProducts(query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getAllProducts"
      );
    }
  }

  @Public()
  @Get("product/:productId")
  async getProduct(
    @Param("productId") productId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.getProduct(productId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getProduct"
      );
    }
  }

  @Post("product")
  async createProduct(
    @Body() body: CreateProductDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createProduct(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createProduct"
      );
    }
  }

  @Put("product/:productId")
  async updateProduct(
    @Param("productId") productId: string,
    @Body() body: UpdateProductDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateProduct(productId, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.updateProduct"
      );
    }
  }

  @Delete("product/:productId")
  async deleteProduct(
    @Param("productId") productId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteProduct(productId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.deleteProduct"
      );
    }
  }
}
