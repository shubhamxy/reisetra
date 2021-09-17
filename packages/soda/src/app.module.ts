import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { AddressModule } from './masters/address/address.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/gaurd/jwt.gaurd'
import { RolesGuard } from './auth/gaurd/roles.gaurd'
import { CartModule } from './carts/cart.module'
import { CacheModule } from './core/modules/cache/cache.module'
import { configOptions, pinoConfig, SettingsEnv } from './core/config'
import { FilesModule } from './masters/files/files.module'
import { HealthCheckModule } from './core/health/health.module'
import { InventoryModule } from './products/inventory/inventory.module'
import { OrderModule } from './orders/order.module'
import { ProductModule } from './products/product.module'
import { ReviewModule } from './products/review/review.module'
import { StoryModule } from './masters/stories/story.module'
import { SupportModule } from './supports/support.module'
import { TransactionModule } from './carts/transaction/transaction.module'
import { UserModule } from './users/user.module'
import { TagModule } from './masters/tag/tag.module'
import { BrandModule } from './masters/brand/brand.module'
import { CategoryModule } from './masters/category/category.module'
import { OfferModule } from './masters/offer/offer.module'
import { FormModule } from './masters/forms/form.module'
import { CONFIG } from './core/config/type'

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        LoggerModule.forRootAsync({
            imports: [],
            inject: [],
            useFactory: () => pinoConfig,
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get<SettingsEnv>(CONFIG.settings).throttle,
        }),
        CacheModule,
        HealthCheckModule,
        AuthModule,
        UserModule,
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
        FilesModule,
        TagModule,
        OfferModule,
        SupportModule,
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
