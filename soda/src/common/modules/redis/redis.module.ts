import { Module, CacheModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";
import { RedisService } from "./redis.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        ttl: configService.get("CACHE_TTL"),
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService], // This is IMPORTANT,  you need to export RedisCacheService here so that other modules can use it
})
export class RedisModule {}
