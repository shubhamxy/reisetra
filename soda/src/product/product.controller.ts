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
import { ProductService } from "./product.service";
import { CustomException, SuccessResponse } from "src/common/response";
import {
  CreateCategoryDto,
  CreateProductDto,
  CreateTagDto,
  GetAllProductsDto,
  UpdateProductDto,
  UpdateTagDto,
} from "./dto";
import { Public } from "src/auth/decorator/public.decorator";
import { AuthenticatedRequest } from "src/auth/auth.interface";
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
      return { data: results || [], meta: meta,};
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
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateProductDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createProduct(request.user.id, body);
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
    @Req() request: AuthenticatedRequest,
    @Param("productId") productId: string,
    @Body() body: UpdateProductDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateProduct(
        request.user.id,
        productId,
        body
      );
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

  @Public()
  @Get("tags")
  async getTags(): Promise<SuccessResponse> {
    try {
      const data = await this.product.getTags();
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getTags"
      );
    }
  }

  @Post("tags")
  async createTags(@Body() body: CreateTagDto): Promise<SuccessResponse> {
    try {
      const data = await this.product.createTags(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createTag"
      );
    }
  }

  @Put("tags")
  async updateTags(@Body() body: UpdateTagDto): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateTags(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.updateTags"
      );
    }
  }

  @Put("tags")
  async deleteTags(@Body() body: UpdateTagDto): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteTags(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.deleteTags"
      );
    }
  }

  @Public()
  @Get("categories")
  async getCategories(): Promise<SuccessResponse> {
    try {
      const data = await this.product.getCategories();
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getCategories"
      );
    }
  }

  @Post("category")
  async createCategory(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createCategory(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createCategory"
      );
    }
  }

  @Put("category")
  async updateCategory(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateCategory(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createCategory"
      );
    }
  }

  @Post("categories")
  async createCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDto[]
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createCategories(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createCategories"
      );
    }
  }

  @Put("category")
  async updateCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateCategories(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.updateCategories"
      );
    }
  }

  @Delete("category")
  async deleteCategories(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCategoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteCategories(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.deleteCategories"
      );
    }
  }
}
