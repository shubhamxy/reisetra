import { HttpModule, Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { CacheModule } from '@app/cache'
import { AuthModule } from '@app/auth'
import { AWSModule } from '@app/aws'
import { DbModule } from '@app/db'

@Module({
  imports: [CacheModule, AuthModule, HttpModule, AWSModule, DbModule],
  providers: [NotificationService],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
