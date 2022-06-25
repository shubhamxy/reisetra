import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { DbService } from '@app/db'
import { ProductService } from './product.service'
import { CacheModule } from '@app/cache'
import { InventoryModule } from './inventory'
import { ReviewModule } from './review'

@Module({
  imports: [CacheModule, InventoryModule, ReviewModule],
  controllers: [ProductController],
  providers: [DbService, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
