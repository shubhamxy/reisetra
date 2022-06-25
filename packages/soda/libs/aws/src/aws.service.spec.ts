import { Test, TestingModule } from '@nestjs/testing'
import { AWSService } from './aws.service'
import { AppTestModule } from '@app/config'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@app/cache'
import { DbModule } from '@app/db'

describe('AwsService', () => {
  let service: AWSService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule, ConfigModule, CacheModule, DbModule],
      providers: [AWSService],
    }).compile()

    service = module.get<AWSService>(AWSService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
