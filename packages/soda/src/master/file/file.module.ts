import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { DbService } from '@app/db'
import { FileService } from './file.service'
import { AWSModule } from '@app/aws'

@Module({
  imports: [AWSModule],
  controllers: [FileController],
  providers: [DbService, FileService],
  exports: [FileService],
})
export class FileModule {}
