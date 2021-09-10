import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { DbService } from '@app/db'
import { CartService } from './cart.service'
import { UserService } from '@app/user'
import { CacheModule } from '@app/cache'
import { TransactionModule } from './transaction'

@Module({
  imports: [CacheModule, TransactionModule],
  controllers: [CartController],
  providers: [DbService, CartService, UserService],
  exports: [CartService],
})
export class CartModule {}
