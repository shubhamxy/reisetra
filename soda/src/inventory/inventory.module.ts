import { Module } from "@nestjs/common";
import { InventoryController } from "./inventory.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { InventoryService } from "./inventory.service";
import { RedisModule } from "src/common/modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [InventoryController],
  providers: [PrismaService, InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
