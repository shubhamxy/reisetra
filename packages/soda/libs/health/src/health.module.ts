import { Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { DbModule } from '@app/db'
import { CacheModule } from '@app/cache'
import { HealthService } from '@app/health/health.service'
import { AWSModule } from '@app/aws'

@Module({
  imports: [CacheModule, DbModule, AWSModule],
  controllers: [HealthCheckController],
  providers: [HealthService],
})
export class HealthCheckModule {}
