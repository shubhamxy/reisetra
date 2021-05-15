import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { AuthController } from './auth.controller';
import { RedisModule } from '../common/modules/redis/redis.module';
import {auth} from '../config';
import { GoogleStrategy } from './strategy/google.strategy';

const config = auth()
@Module({
  imports: [
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: config.jwtAccessTokenOptions.secret,
      signOptions: {
        expiresIn: config.jwtAccessTokenOptions.expiresIn,
        audience: config.jwtAccessTokenOptions.audience,
        issuer: config.jwtAccessTokenOptions.issuer,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
