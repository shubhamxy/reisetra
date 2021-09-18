import { Test, TestingModule } from '@nestjs/testing'
import { HealthService } from './health.service'
import { DbModule } from '@app/db'
import { ConfigModule } from '@nestjs/config'

describe('HealthService', () => {
  let service: HealthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule, ConfigModule],
      providers: [HealthService],
    }).compile()

    service = module.get<HealthService>(HealthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
