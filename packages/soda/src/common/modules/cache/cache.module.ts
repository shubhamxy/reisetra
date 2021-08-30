import { Module, CacheModule as NestCacheModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'
import { CacheEnv } from 'src/config'
import { CacheService } from './cache.service'

@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get<CacheEnv>('cache').enable
                    ? {
                          store: redisStore,
                          host: configService.get<CacheEnv>('cache').host,
                          port: configService.get<CacheEnv>('cache').port,
                          ttl: configService.get<CacheEnv>('cache').cacheTTL,
                      }
                    : {
                          store: 'memory',
                          ttl: configService.get<CacheEnv>('cache').cacheTTL,
                      },
        }),
    ],

    providers: [CacheService],
    exports: [CacheService], // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class CacheModule {}
