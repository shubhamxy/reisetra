import { Test } from '@nestjs/testing'
import { DbService } from '@app/db'
import { GetAllProductsDTO } from '../dto'

import { ProductController } from '../product.controller'
import { ProductService } from '../product.service'
import { AppTestModule } from '@app/config'

describe('ProductController', () => {
  let productController: ProductController
  // let productService: ProductService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppTestModule],
      controllers: [ProductController],
      providers: [DbService, ProductService],
      exports: [ProductService],
    }).compile()
    // productService = moduleRef.get<ProductService>(ProductService)
    productController = moduleRef.get<ProductController>(ProductController)
  })

  describe('getAllProducts', () => {
    it('should return an paginated list of product', async () => {
      const result = await productController.getAllProducts(
        new GetAllProductsDTO()
      )

      expect(Array.isArray(result.data)).toEqual(true)
      expect(result.meta.page).toEqual(1)
    })
  })
})
