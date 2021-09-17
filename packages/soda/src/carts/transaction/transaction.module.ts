import { HttpModule, Module } from '@nestjs/common'
import { TransactionController } from './transaction.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { TransactionService } from './transaction.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { AuthModule } from 'src/auth/auth.module'
import { AWSModule } from '../../core/modules/aws/aws.module'

@Module({
    imports: [CacheModule, HttpModule, AuthModule, AWSModule],
    controllers: [TransactionController],
    providers: [PrismaService, TransactionService],
    exports: [TransactionService],
})
export class TransactionModule {}
