import { Routes, setupNestApp } from '@app/core'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'

import { INestApplication } from '@nestjs/common'
import { DbService } from '@app/db'
import { AppEnv, AppTestModule } from '@app/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ProductModule } from '../product.module'

describe('ProductController (e2e)', () => {
  let app: INestApplication
  let config: AppEnv
  let api: string
  let moduleFixture: TestingModule

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppTestModule, ProductModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestExpressApplication>()
    config = setupNestApp(app as NestExpressApplication)
    api = config.apiPrefix
    await app.init()
  })

  it(`/${Routes.products} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/${api}${Routes.products}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined()
        expect(res.body.data).toBeDefined()
        expect(Array.isArray(res.body.data)).toBeTruthy()
        expect(res.body.meta).toBeDefined()
        expect(res.body.meta).toEqual(
          expect.objectContaining({
            page: 1,
          })
        )
      })
  })

  afterAll(async () => {
    const prisma = app.get(DbService)
    await prisma.$disconnect()
    await app.close()
  })
})
