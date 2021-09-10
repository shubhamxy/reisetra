import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { DbService } from '@app/db'
import { ReviewService } from './review.service'
import { CacheModule } from '@app/cache'

@Module({
  imports: [CacheModule],
  controllers: [ReviewController],
  providers: [DbService, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
