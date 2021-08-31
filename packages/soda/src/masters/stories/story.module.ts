import { Module } from '@nestjs/common'
import { StoryController } from './story.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { StoryService } from './story.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [StoryController],
    providers: [PrismaService, StoryService],
    exports: [StoryService],
})
export class StoryModule {}
