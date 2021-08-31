import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'
import { UserModule } from '../users/user.module'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtRefreshStrategy } from './strategy/refresh.strategy'
import { AuthController } from './auth.controller'
import { CacheModule } from '../core/modules/cache/cache.module'
import { AuthEnv } from '../core/config'
import { GoogleStrategy } from './strategy/google.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
    imports: [
        UserModule,
        PassportModule,
        CacheModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const config = configService.get<AuthEnv>('auth')
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
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
        GoogleStrategy,
    ],
    exports: [AuthService],
})
export class AuthModule {}
