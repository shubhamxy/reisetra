import { setupNestApp } from 'src/core/setupNestApp'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'

import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../src/core/modules/db/prisma.service'
import { AppEnv } from 'src/core/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ROUTES } from 'src/core/constants'

const testData = [
    {
        version: '1.0.0',
        data: { database: 'up', server: 'up' },
    },
]

describe('AppController (e2e)', () => {
    let app: INestApplication
    let config: AppEnv
    let api: string
    let moduleFixture: TestingModule

    beforeAll(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication<NestExpressApplication>()
        config = setupNestApp(app as NestExpressApplication)
        api = config.apiPrefix
        await app.init()
    })

    it(`/healthz (GET)`, () => {
        return request(app.getHttpServer())
            .get(`/${api}${ROUTES.healthz}`)
            .expect(200)
            .expect((res) => {
                return expect(res.body).toEqual(
                    expect.objectContaining({
                        version: testData[0].version,
                        data: expect.objectContaining(testData[0].data),
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
