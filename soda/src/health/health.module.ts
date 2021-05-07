import { CacheModule, Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { PrismaService } from '../db/prisma.service'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [HealthCheckController],
  providers: [PrismaService,],
})
export class HealthCheckModule {}



