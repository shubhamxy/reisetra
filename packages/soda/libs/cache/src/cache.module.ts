import { CacheModule as NestCacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheService } from './cache.service'
import { CacheEnv, Config } from '@app/config'

@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<CacheEnv>(Config.cache).enable
          ? {
              store: redisStore,
              host: configService.get<CacheEnv>(Config.cache).host,
              port: configService.get<CacheEnv>(Config.cache).port,
              ttl: configService.get<CacheEnv>(Config.cache).cacheTTL,
            }
          : {
              store: 'memory',
              ttl: configService.get<CacheEnv>(Config.cache).cacheTTL,
            },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, NestCacheModule], // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class CacheModule {}
