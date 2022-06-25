import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule, UserService } from '@app/user'
import { CacheModule, CacheService } from '@app/cache'
import { AuthEnv, Config } from '@app/config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AWSModule, AWSService } from '@app/aws'
import {
  GoogleStrategy,
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
} from './strategy'
import { DbService } from '@app/db'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    AWSModule,
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<AuthEnv>(Config.auth)
        return {
          secret: config.jwtAccessTokenOptions.secret,
          signOptions: {
            expiresIn: config.jwtAccessTokenOptions.expiresIn,
            audience: config.jwtAccessTokenOptions.audience,
            issuer: config.jwtAccessTokenOptions.issuer,
          },
        }
      },
    }),
    CacheModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    UserService,
    AWSService,
    CacheService,
    DbService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
