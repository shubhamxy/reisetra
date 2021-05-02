import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { HealthCheckModule } from './health/health.module'
import { UserModule } from './user/user.module'
import { config } from './config'
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import {REDIS_HOST, REDIS_PORT} from 'src/config'
import { RedisService } from './redis/redis.service';
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/gaurd/jwt.gaurd'
import { RolesGuard } from './auth/gaurd/roles.gaurd'
const getconfig = (): any => config;
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      load: [getconfig],
    }),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     safe: true,
    //     prettyPrint: true
    //   }
    // }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [],
        useFactory: () => ({
          store: redisStore,
          host: REDIS_HOST,
          port: REDIS_PORT,
          ttl: 120
        }),
    }),
    AuthModule,
    HealthCheckModule,
    UserModule,
  ],

  controllers: [],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
