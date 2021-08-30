import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { AddressService } from './address.service'
import { CacheModule } from 'src/common/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [AddressController],
    providers: [PrismaService, AddressService],
    exports: [],
})
export class AddressModule {}
