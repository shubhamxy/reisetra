import { setupNestApp } from 'src/setupNestApp'
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'

import { INestApplication } from '@nestjs/common'
import { PrismaService } from '../src/core/modules/db/prisma.service'
import { AppEnv } from 'src/config'
import { NestExpressApplication } from '@nestjs/platform-express'

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
        return request(app.getHttpServer()).get(`/${api}/healthz`).expect(200)
    })

    afterAll(async () => {
        const prisma = app.get(PrismaService)
        await prisma.$disconnect()
        await app.close()
    })
})
