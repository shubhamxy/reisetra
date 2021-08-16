import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { ProductService } from "./product.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
    imports: [CacheModule],
    controllers: [ProductController],
    providers: [PrismaService, ProductService],
    exports: [ProductService],
})
export class ProductModule {}
