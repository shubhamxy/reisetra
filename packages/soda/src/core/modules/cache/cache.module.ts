import { CacheModule as NestCacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheEnv } from 'src/core/config'
import { CacheService } from './cache.service'
import { CONFIG } from '../../config/type'

@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get<CacheEnv>(CONFIG.cache).enable
                    ? {
                          store: redisStore,
                          host: configService.get<CacheEnv>(CONFIG.cache).host,
                          port: configService.get<CacheEnv>(CONFIG.cache).port,
                          ttl: configService.get<CacheEnv>(CONFIG.cache)
                              .cacheTTL,
                      }
                    : {
                          store: 'memory',
                          ttl: configService.get<CacheEnv>(CONFIG.cache)
                              .cacheTTL,
                      },
        }),
    ],

    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
