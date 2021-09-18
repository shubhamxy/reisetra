import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { DbService } from '@app/db'
import { CategoryService } from './category.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [CategoryController],
  providers: [DbService, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
