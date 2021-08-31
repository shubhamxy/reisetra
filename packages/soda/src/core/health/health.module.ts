import { Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { PrismaService } from '../modules/db/prisma.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [HealthCheckController],
    providers: [PrismaService],
})
export class HealthCheckModule {}
