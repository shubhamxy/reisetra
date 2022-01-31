import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { AddressModule } from './master/address/address.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/gaurd/jwt.gaurd'
import { RolesGuard } from './auth/gaurd/roles.gaurd'
import { CartModule } from './cart/cart.module'
import { CacheModule } from './core/modules/cache/cache.module'
import { configOptions, pinoConfig, SettingsEnv } from './config'
import { FilesModule } from './master/files/files.module'
import { HealthCheckModule } from './health/health.module'
import { InventoryModule } from './product/inventory/inventory.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './product/review/review.module'
import { StoryModule } from './story/story.module'
import { SupportModule } from './support/support.module'
import { TransactionModule } from './order/transaction/transaction.module'
import { UserModule } from './user/user.module'
import { TagModule } from './master/tag/tag.module'
import { BrandModule } from './master/brand/brand.module'
import { CategoryModule } from './master/category/category.module'
import { OfferModule } from './master/offer/offer.module'
import { FormModule } from './form/form.module'

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        LoggerModule.forRootAsync({
            imports: [],
            inject: [],
            useFactory: () => {
                return pinoConfig
            },
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config = configService.get<SettingsEnv>('settings')
                return config.throttle
            },
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
