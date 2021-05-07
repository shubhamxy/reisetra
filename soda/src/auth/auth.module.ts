import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { AuthController } from './auth.controller';
import { RedisModule } from 'src/redis/redis.module';
import { JWT_ACCESS_TOKEN_OPTIONS } from 'src/config';
import { GoogleStrategy } from './strategy/google.strategy';


@Module({
  imports: [
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: JWT_ACCESS_TOKEN_OPTIONS.secret,
      signOptions: {
        expiresIn: JWT_ACCESS_TOKEN_OPTIONS.expiresIn
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
