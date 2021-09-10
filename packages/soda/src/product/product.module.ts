import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { DbService } from '@app/db'
import { ProductService } from './product.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [ProductController],
  providers: [DbService, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
