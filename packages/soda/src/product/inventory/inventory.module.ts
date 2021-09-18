import { Module } from '@nestjs/common'
import { InventoryController } from './inventory.controller'
import { DbService } from '@app/db'
import { InventoryService } from './inventory.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [InventoryController],
  providers: [DbService, InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
