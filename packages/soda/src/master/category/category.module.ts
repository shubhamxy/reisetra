import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { CategoryService } from './category.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [CategoryController],
    providers: [PrismaService, CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
