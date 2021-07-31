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
  CreateCompanyDto,
  CreateCategoryDto,
  CreateProductDto,
  CreateTagDto,
  GetAllProductsDto,
  UpdateProductDto,
  UpdateTagDto,
} from "./dto";
import { Public } from "src/auth/decorator/public.decorator";
import { AuthenticatedRequest } from "src/auth/auth.interface";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Throttle } from "@nestjs/throttler";
@Controller()
export class ProductController {
  constructor(private readonly product: ProductService) {}
  @Throttle(60, 120)
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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
  async getTags(@Query("category") category: string): Promise<SuccessResponse> {
    try {
      const data = await this.product.getTags(category);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getTags"
      );
    }
  }

  @Roles("ADMIN")
  @Post("tag")
  async createTag(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateTagDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createTag(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createTag"
      );
    }
  }

  @Roles("ADMIN")
  @Post("tags")
  async createTags(@Body() body: CreateTagDto[]): Promise<SuccessResponse> {
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

  @Roles("ADMIN")
  @Put("tags")
  async updateTags(@Body() body: UpdateTagDto[]): Promise<SuccessResponse> {
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

  @Roles("ADMIN")
  @Put("tags")
  async deleteTags(@Body() body: UpdateTagDto[]): Promise<SuccessResponse> {
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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

  @Roles("ADMIN")
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

  @Public()
  @Get("brands")
  async getBrands(@Query("category") category: string): Promise<SuccessResponse> {
    try {
      const data = await this.product.getBrands(category);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.getBrands"
      );
    }
  }

  @Roles("ADMIN")
  @Post("brand")
  async createBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.createBrand(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.createBrand"
      );
    }
  }

  @Put("brand")
  async updateBrand(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateCompanyDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.product.updateBrand(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.updateBrand"
      );
    }
  }

  @Roles("ADMIN")
  @Delete("brand")
  async deleteBrand(@Body() body: CreateCompanyDto): Promise<SuccessResponse> {
    try {
      const data = await this.product.deleteBrand(body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "ProductController.deleteBrand"
      );
    }
  }
}
