import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { CacheModule } from 'src/core/modules/cache/cache.module'
import { configOptions, pinoConfig, SettingsEnv } from 'src/core/config'

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
    ],
    controllers: [],
    providers: [],
    exports: [CacheModule, ConfigModule, LoggerModule, ThrottlerModule],
})
export class AppTestModule {}
