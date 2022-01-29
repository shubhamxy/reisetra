import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { PrismaService } from '../common/modules/db/prisma.service'
import { FilesService } from './files.service'

@Module({
    imports: [],
    controllers: [FilesController],
    providers: [PrismaService, FilesService],
    exports: [FilesService],
})
export class FilesModule {}
