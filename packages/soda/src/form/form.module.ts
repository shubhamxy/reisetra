import { Module } from '@nestjs/common'
import { FormController } from './form.controller'
import { PrismaService } from '../core/modules/db/prisma.service'
import { FormService } from './form.service'
import { CacheModule } from 'src/core/modules/cache/cache.module'

@Module({
    imports: [CacheModule],
    controllers: [FormController],
    providers: [PrismaService, FormService],
    exports: [FormService],
})
export class FormModule {}
