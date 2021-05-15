import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'nestjs-pino';
import {config } from './config';
import { pinoConfig } from "./config";
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/gaurd/jwt.gaurd';
import { RolesGuard } from './auth/gaurd/roles.gaurd';
import { CartModule } from './cart/cart.module';
import { validate } from './config/env.validation';
import { HealthCheckModule } from './health/health.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AddressModule } from './address/address.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      cache: true,
      validationOptions: {config},
      validate,
    }),
    ThrottlerModule.forRoot({
      limit: 10000,
      ttl: 120,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis').host,
        port: configService.get('redis').port,
        ttl: configService.get('redis').cacheTTL,
      }),
    }),
    HealthCheckModule,
    AuthModule,
    UserModule,
    CartModule,
    ProductModule,
    InventoryModule,
    OrderModule,
    AddressModule,
    TransactionModule,
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
