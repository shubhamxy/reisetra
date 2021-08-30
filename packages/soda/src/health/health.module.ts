import { Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { CacheModule } from 'src/common/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [HealthCheckController],
    providers: [PrismaService],
})
export class HealthCheckModule {}
