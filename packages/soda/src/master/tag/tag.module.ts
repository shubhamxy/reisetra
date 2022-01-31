import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { TagService } from './tag.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [TagController],
    providers: [PrismaService, TagService],
    exports: [TagService],
})
export class TagModule {}
