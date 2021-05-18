import { Module } from "@nestjs/common";
import { AddressController } from "./address.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { AddressService } from "./address.service";
import { RedisModule } from "src/common/modules/redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [AddressController],
  providers: [PrismaService, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
