import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { Config, configOptions, SettingsEnv } from './env'
import { CacheModule } from '@app/cache'

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
      useFactory: (configService: ConfigService) => {
        const config = configService.get<SettingsEnv>(Config.settings)
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
