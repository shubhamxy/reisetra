import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { DbService } from '@app/db'
import { AddressService } from './address.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [AddressController],
  providers: [DbService, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
