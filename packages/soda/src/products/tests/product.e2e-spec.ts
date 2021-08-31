import { setupNestApp } from 'src/core/setupNestApp'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'

import { INestApplication } from '@nestjs/common'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { AppEnv } from 'src/core/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ProductModule } from '../product.module'
import { ROUTES } from 'src/core/constants'
import { AppTestModule } from 'src/core/modules'

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

    it(`/${ROUTES.products} (GET)`, () => {
        return request(app.getHttpServer())
            .get(`/${api}${ROUTES.products}`)
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
        const prisma = app.get(PrismaService)
        await prisma.$disconnect()
        await app.close()
    })
})
