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
import { ProductService } from './product.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import { CreateProductDTO, GetAllProductsDTO, UpdateProductDTO } from './dto'
import { Public } from 'src/auth/decorator/public.decorator'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Role, Roles } from 'src/auth/decorator/roles.decorator'
import { Throttle } from '@nestjs/throttler'
import { ROUTES } from 'src/core/constants'

@Controller(ROUTES.products)
export class ProductController {
    constructor(private readonly product: ProductService) {}

    @Throttle(60, 120)
    @Public()
    @Get()
    async getAllProducts(
        @Query() query: GetAllProductsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.product.getAllProducts(
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.getAllProducts'
            )
        }
    }

    @Throttle(60, 120)
    @Public()
    @Get(ROUTES.products_recommendations)
    async getRecommendations(
        @Query() query: GetAllProductsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.product.getRecommendations(
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.getRecommendations'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Post()
    async createProduct(
        @Req() request: AuthenticatedRequest,
        @Body() body: CreateProductDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.product.createProduct(request.user.id, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.createProduct'
            )
        }
    }

    @Throttle(60, 120)
    @Public()
    @Get(ROUTES.products_by_slug)
    async getProduct(@Param('slug') slug: string): Promise<SuccessResponse> {
        try {
            const data = await this.product.getProduct(slug)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.getProduct'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Put(ROUTES.products_by_slug)
    async updateProduct(
        @Req() request: AuthenticatedRequest,
        @Param('slug') slug: string,
        @Body() body: UpdateProductDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.product.updateProduct(
                request.user.id,
                slug,
                body
            )
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.updateProduct'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Delete(ROUTES.products_by_slug)
    async deleteProduct(
        @Param('productId') productId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.product.deleteProduct(productId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'ProductController.deleteProduct'
            )
        }
    }
}
