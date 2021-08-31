import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { CartService } from './cart.service'
import { UserService } from '../users/user.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { TransactionModule } from 'src/carts/transaction/transaction.module'

@Module({
    imports: [CacheModule, TransactionModule],
    controllers: [CartController],
    providers: [PrismaService, CartService, UserService],
    exports: [CartService],
})
export class CartModule {}
