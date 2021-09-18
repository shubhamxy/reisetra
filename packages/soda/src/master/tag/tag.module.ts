import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { DbService } from '@app/db'
import { TagService } from './tag.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [TagController],
  providers: [DbService, TagService],
  exports: [TagService],
})
export class TagModule {}
