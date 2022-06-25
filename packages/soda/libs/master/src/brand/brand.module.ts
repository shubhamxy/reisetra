import { Module } from '@nestjs/common'
import { BrandController } from './brand.controller'
import { DbService } from '@app/db'
import { BrandService } from './brand.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [BrandController],
  providers: [DbService, BrandService],
  exports: [BrandService],
})
export class BrandModule {}
