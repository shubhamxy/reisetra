import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { ProductService } from "./product.service";
import { RedisModule } from "src/common/modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
