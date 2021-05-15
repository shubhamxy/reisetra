import { Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { RedisModule } from 'src/common/modules/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [HealthCheckController],
  providers: [PrismaService,],
})
export class HealthCheckModule {}



