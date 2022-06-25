import { Module } from '@nestjs/common'
import { OfferController } from './offer.controller'
import { DbService } from '@app/db'
import { OfferService } from './offer.service'
import { UserService } from '@app/user'
import { CacheModule } from '@app/cache'
import { TransactionModule } from 'src/cart/transaction/transaction.module'

@Module({
  imports: [CacheModule, TransactionModule],
  controllers: [OfferController],
  providers: [DbService, OfferService, UserService],
  exports: [OfferService],
})
export class OfferModule {}
