import { Module } from '@nestjs/common'
import { StoryController } from './story.controller'
import { DbService } from '@app/db'
import { StoryService } from './story.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [StoryController],
  providers: [DbService, StoryService],
  exports: [StoryService],
})
export class StoryModule {}
