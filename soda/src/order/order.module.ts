import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { OrderService } from "./order.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
  imports: [CacheModule],
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
