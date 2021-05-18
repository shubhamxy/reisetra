import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { OrderService } from "./order.service";
import { RedisModule } from "src/common/modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
