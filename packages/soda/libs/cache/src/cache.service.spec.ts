import { Test, TestingModule } from '@nestjs/testing'
import { CacheService } from './cache.service'
import { AppTestModule } from '@app/config'

describe('CacheService', () => {
  let service: CacheService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
      providers: [CacheService],
      exports: [],
    }).compile()

    service = module.get<CacheService>(CacheService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
