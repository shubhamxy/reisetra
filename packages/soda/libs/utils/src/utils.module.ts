import { Module } from '@nestjs/common'
import { UtilsService } from './utils.service'
import { UtilsController } from './utils.controller'
import { CacheModule } from '@app/cache'
import { DbModule } from '@app/db'

@Module({
  imports: [CacheModule, DbModule],
  providers: [UtilsService],
  controllers: [UtilsController],
  exports: [UtilsService],
})
export class UtilsModule {}
