import { Module } from '@nestjs/common'
import { SupportController } from './support.controller'
import { DbService } from '@app/db'
import { SupportService } from './support.service'
import { CacheModule } from '@app/cache'
import { AuthModule } from '@app/auth'
import { AWSModule } from '@app/aws'

@Module({
  imports: [CacheModule, AuthModule, AWSModule],
  controllers: [SupportController],
  providers: [DbService, SupportService],
  exports: [SupportService],
})
export class SupportModule {}
