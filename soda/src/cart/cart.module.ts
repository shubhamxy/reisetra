import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { CartService } from "./cart.service";
import { CacheModule } from "src/common/modules/cache/cache.module";
import { TransactionService } from "src/transaction/transaction.service";
import { TransactionModule } from "src/transaction/transaction.module";

@Module({
  imports: [CacheModule, TransactionModule],
  controllers: [CartController],
  providers: [PrismaService, CartService],
  exports: [CartService],
})
export class CartModule {}
