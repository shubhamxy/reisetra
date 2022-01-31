import { Module } from '@nestjs/common'
import { InventoryController } from './inventory.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { InventoryService } from './inventory.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [InventoryController],
    providers: [PrismaService, InventoryService],
    exports: [InventoryService],
})
export class InventoryModule {}
