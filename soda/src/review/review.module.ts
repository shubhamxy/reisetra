import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { ReviewService } from "./review.service";
import { RedisModule } from "src/common/modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [ReviewController],
  providers: [PrismaService, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
