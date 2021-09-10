import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import {
  AddressModule,
  BrandModule,
  CategoryModule,
  FileModule,
  FormModule,
  OfferModule,
  StoryModule,
  TagModule,
} from './master'
import { AuthModule, JwtAuthGuard, RolesGuard } from '@app/auth'
import { CartModule, TransactionModule } from './cart'
import { Config, configOptions, SettingsEnv } from '@app/config'
import { HealthCheckModule } from '@app/health'
import { OrderModule } from './order'
import { InventoryModule, ProductModule, ReviewModule } from './product'
import { SupportModule } from './support'
import { UserModule } from '@app/user'
import { CacheModule } from '@app/cache'
import { DbModule } from '@app/db'
import { ParsePlainTextMiddleware } from '@app/core/middleware/parse-plaintext.middleware'
import { ROUTES } from '@app/core'
import { NotificationModule } from '@app/notification'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<SettingsEnv>(Config.settings).pino,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<SettingsEnv>(Config.settings).throttle,
    }),
    CacheModule,
    DbModule,
    HealthCheckModule,
    UserModule,
    AuthModule,
    AddressModule,
    ProductModule,
    InventoryModule,
    StoryModule,
    CartModule,
    OrderModule,
    TransactionModule,
    ReviewModule,
    BrandModule,
    CategoryModule,
    FormModule,
    FileModule,
    TagModule,
    OfferModule,
    SupportModule,
    NotificationModule,
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParsePlainTextMiddleware).forRoutes(ROUTES.notification)
  }
}
