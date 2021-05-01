import { Module } from '@nestjs/common'
import { HealthCheckController } from './health.controller'
import { PrismaService } from '../common/prisma.service'

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [PrismaService],
})
export class HealthCheckModule {}


