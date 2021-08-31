import { Module } from '@nestjs/common'
import { OfferController } from './offer.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { OfferService } from './offer.service'
import { UserService } from '../../users/user.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { TransactionModule } from 'src/carts/transaction/transaction.module'

@Module({
    imports: [CacheModule, TransactionModule],
    controllers: [OfferController],
    providers: [PrismaService, OfferService, UserService],
    exports: [OfferService],
})
export class OfferModule {}
