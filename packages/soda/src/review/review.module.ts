import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { ReviewService } from "./review.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
  imports: [CacheModule],
  controllers: [ReviewController],
  providers: [PrismaService, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
