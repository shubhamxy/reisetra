import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { AddressService } from './address.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [AddressController],
    providers: [PrismaService, AddressService],
    exports: [AddressService],
})
export class AddressModule {}
