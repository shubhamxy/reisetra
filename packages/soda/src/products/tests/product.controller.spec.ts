import { Test } from '@nestjs/testing'
import { AppTestModule } from 'src/core/modules'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { GetAllProductsDTO } from '../dto'

import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'

describe('ProductController', () => {
    let productController: ProductController
    // let productService: ProductService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppTestModule],
            controllers: [ProductController],
            providers: [PrismaService, ProductService],
            exports: [ProductService],
        }).compile()
        // productService = moduleRef.get<ProductService>(ProductService)
        productController = moduleRef.get<ProductController>(ProductController)
    })

    describe('getAllProducts', () => {
        it('should return an paginated list of products', async () => {
            const result = await productController.getAllProducts(
                new GetAllProductsDTO()
            )

            expect(Array.isArray(result.data)).toEqual(true)
            expect(result.meta.page).toEqual(1)
        })
    })
})
