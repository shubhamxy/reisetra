import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { ProductService } from './product.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [ProductController],
    providers: [PrismaService, ProductService],
    exports: [ProductService],
})
export class ProductModule {}
