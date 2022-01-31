import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { OrderService } from './order.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [OrderController],
    providers: [PrismaService, OrderService],
    exports: [OrderService],
})
export class OrderModule {}
