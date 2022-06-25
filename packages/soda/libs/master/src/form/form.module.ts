import { Module } from '@nestjs/common'
import { FormController } from './form.controller'
import { DbService } from '@app/db'
import { FormService } from './form.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [FormController],
  providers: [DbService, FormService],
  exports: [FormService],
})
export class FormModule {}
