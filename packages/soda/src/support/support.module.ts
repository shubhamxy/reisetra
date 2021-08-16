import { Module } from "@nestjs/common";
import { SupportController } from "./support.controller";
import { PrismaService } from "../common/modules/db/prisma.service";
import { SupportService } from "./support.service";
import { CacheModule } from "src/common/modules/cache/cache.module";

@Module({
    imports: [CacheModule],
    controllers: [SupportController],
    providers: [PrismaService, SupportService],
    exports: [SupportService],
})
export class SupportModule {}
