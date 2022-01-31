import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { PrismaService } from '../../core/modules/db/prisma.service'
import { FilesService } from './files.service'
import { AWSModule } from 'src/core/modules/aws/aws.module'

@Module({
    imports: [AWSModule],
    controllers: [FilesController],
    providers: [PrismaService, FilesService],
    exports: [FilesService],
})
export class FilesModule {}
