import { HttpModule, Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { TransactionService } from "./transaction.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
  imports: [CacheModule, HttpModule],
  controllers: [TransactionController],
  providers: [PrismaService, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
