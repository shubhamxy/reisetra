import { HttpModule, Module } from '@nestjs/common'
import { TransactionController } from './transaction.controller'
import { DbService } from '@app/db'
import { TransactionService } from './transaction.service'
import { CacheModule } from '@app/cache'
import { AuthModule } from '@app/auth'
import { AWSModule } from '@app/aws'

@Module({
  imports: [CacheModule, HttpModule, AuthModule, AWSModule],
  controllers: [TransactionController],
  providers: [DbService, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
