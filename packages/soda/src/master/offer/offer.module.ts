import { Module } from '@nestjs/common'
import { OfferController } from './offer.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { OfferService } from './offer.service'
import { UserService } from '../../user/user.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { TransactionModule } from 'src/order/transaction/transaction.module'

@Module({
    imports: [CacheModule, TransactionModule],
    controllers: [OfferController],
    providers: [PrismaService, OfferService, UserService],
    exports: [OfferService],
})
export class OfferModule {}
