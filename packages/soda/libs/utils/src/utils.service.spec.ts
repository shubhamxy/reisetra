import { Test, TestingModule } from '@nestjs/testing'
import { UtilsService } from './utils.service'
import { AppTestModule } from '@app/config'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@app/db'

describe('UtilsService', () => {
  let service: UtilsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
      providers: [UtilsService, PrismaService, ConfigService],
    }).compile()

    service = module.get<UtilsService>(UtilsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
