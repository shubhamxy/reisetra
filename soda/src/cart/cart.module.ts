import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { CartService } from './cart.service'
import { RedisModule } from 'src/common/modules/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [CartController],
  providers: [PrismaService, CartService],
  exports: [CartService],
})
export class CartModule {}


