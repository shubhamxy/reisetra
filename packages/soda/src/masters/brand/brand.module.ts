import { Module } from '@nestjs/common'
import { BrandController } from './brand.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { BrandService } from './brand.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [BrandController],
    providers: [PrismaService, BrandService],
    exports: [BrandService],
})
export class BrandModule {}
