import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { HealthCheckModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import { IS_PRODUCTION, REDIS_HOST, REDIS_PORT } from 'src/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/gaurd/jwt.gaurd';
import { RolesGuard } from './auth/gaurd/roles.gaurd';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 120,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'Log',
        level: IS_PRODUCTION ? 'error' : 'error',
        prettyPrint: { colorize: true, levelFirst: true },
      }
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [],
      useFactory: () => ({
        store: redisStore,
        host: REDIS_HOST,
        port: REDIS_PORT,
        ttl: 120,
      }),
    }),
    AuthModule,
    HealthCheckModule,
    UserModule,
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
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
