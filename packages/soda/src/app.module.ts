import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import { AddressModule } from "./address/address.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/gaurd/jwt.gaurd";
import { RolesGuard } from "./auth/gaurd/roles.gaurd";
import { CartModule } from "./cart/cart.module";
import { config, pinoConfig } from "./config";
import { validate } from "./config/env.validation";
import { HealthCheckModule } from "./health/health.module";
import { InventoryModule } from "./inventory/inventory.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { TransactionModule } from "./transaction/transaction.module";
import { UserModule } from "./user/user.module";
import { FilesModule } from "./files/files.module";
import { ReviewModule } from "./review/review.module";
import { CacheModule } from "./common/modules/cache/cache.module";
import settings from "./config/settings";
const settingsEnv = settings();

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: ['/api*'],
    //   serveStaticOptions: {
    //   }
    // }),
    LoggerModule.forRoot(pinoConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      cache: true,
      validationOptions: { config },
      validate,
    }),
    ThrottlerModule.forRoot(settingsEnv.throttle),
    CacheModule,
    HealthCheckModule,
    AuthModule,
    UserModule,
    CartModule,
    ProductModule,
    InventoryModule,
    OrderModule,
    AddressModule,
    TransactionModule,
    FilesModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
