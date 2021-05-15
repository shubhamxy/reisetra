import { Module } from '@nestjs/common'
import { TransactionController } from './transaction.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { TransactionService } from './transaction.service'
import { RedisModule } from 'src/common/modules/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [TransactionController],
  providers: [PrismaService, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
