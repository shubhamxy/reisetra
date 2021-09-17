import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { OrderService } from './order.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { AuthModule } from 'src/auth/auth.module'
import { AWSModule } from '../core/modules/aws/aws.module'

@Module({
    imports: [CacheModule, AuthModule, AWSModule],
    controllers: [OrderController],
    providers: [PrismaService, OrderService],
    exports: [OrderService],
})
export class OrderModule {}
