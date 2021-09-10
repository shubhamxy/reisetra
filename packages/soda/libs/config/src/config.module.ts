import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

@Module({
  imports: [NestConfigModule],
  providers: [ConfigService],
  exports: [ConfigService, NestConfigModule],
})
export class ConfigModule {}
