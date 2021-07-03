import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { UserService } from "./user.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
  imports: [CacheModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
