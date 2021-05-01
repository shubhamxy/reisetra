import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { HealthCheckModule } from './health/health.module'
import { UserModule } from './user/user.module'
import { config } from './config'
const getconfig = (): any => config;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getconfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: true
      }
    }),
    HealthCheckModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
