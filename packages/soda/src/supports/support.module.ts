import { Module } from '@nestjs/common'
import { SupportController } from './support.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { SupportService } from './support.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { AuthModule } from 'src/auth/auth.module'
import { AWSModule } from '../core/modules/aws/aws.module'

@Module({
    imports: [CacheModule, AuthModule, AWSModule],
    controllers: [SupportController],
    providers: [PrismaService, SupportService],
    exports: [SupportService],
})
export class SupportModule {}
