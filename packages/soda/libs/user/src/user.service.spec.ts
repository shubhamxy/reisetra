import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '@app/user'
import { PrismaService } from '@app/db'
import { AppTestModule } from '@app/config'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
      providers: [PrismaService, UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
