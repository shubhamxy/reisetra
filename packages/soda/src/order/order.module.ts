import { Module } from '@nestjs/common'
import { OrderController } from './order.controller'
import { DbService } from '@app/db'
import { OrderService } from './order.service'
import { CacheModule } from '@app/cache'
import { AuthModule } from '@app/auth'
import { AWSModule } from '@app/aws'

@Module({
  imports: [CacheModule, AuthModule, AWSModule],
  controllers: [OrderController],
  providers: [DbService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
