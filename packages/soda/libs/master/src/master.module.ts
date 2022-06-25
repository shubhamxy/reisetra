import { Module } from '@nestjs/common'
import { MasterService } from './master.service'
import { AddressModule } from '@app/master/address'
import { BrandModule } from '@app/master/brand'
import { CategoryModule } from '@app/master/category'
import { FileModule } from '@app/master/file'
import { FormModule } from '@app/master/form'
import { OfferModule } from '@app/master/offer'
import { StoryModule } from '@app/master/story'
import { TagModule } from '@app/master/tag'

@Module({
  imports: [
    AddressModule,
    BrandModule,
    CategoryModule,
    FileModule,
    FormModule,
    OfferModule,
    StoryModule,
    TagModule,
  ],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}
