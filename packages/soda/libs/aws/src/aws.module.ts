import { Module } from '@nestjs/common'
import { AWSService } from './aws.service'
import { ConfigModule } from '@nestjs/config'
import { TemplateService } from './template.service'
import { CacheModule } from '@app/cache'
import { DbModule } from '@app/db'

@Module({
  imports: [ConfigModule, CacheModule, DbModule],
  providers: [AWSService, TemplateService],
  exports: [AWSService, TemplateService],
})
export class AWSModule {}
