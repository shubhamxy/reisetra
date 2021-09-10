import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AppTestModule, AuthEnv, Config } from '@app/config'
import { UserService } from '@app/user'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AWSModule, AWSService } from '@app/aws'
import { CacheModule } from '@app/cache'
import { DbService } from '@app/db'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestModule,
        CacheModule,
        AWSModule,
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
      ],
      providers: [AuthService, UserService, AWSService, DbService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
