import { Module } from '@nestjs/common'
import { AWSService } from './aws.service'

@Module({
    imports: [],
    providers: [AWSService],
    exports: [AWSService],
})
export class AWSModule {}
