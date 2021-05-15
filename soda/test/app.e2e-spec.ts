import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

import { INestApplication } from '@nestjs/common';
import { setupNestApp } from 'src/main';
import { PrismaService } from '../src/common/modules/db/prisma.service';
import { AppEnv } from 'src/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let config: AppEnv;
  let api: string;
  let moduleFixture: TestingModule;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    config = setupNestApp(app);
    api = config.apiPrefix;
    await app.init();
  });

  it(`/__internal/health (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/${api}/__internal/health`)
      .expect(200)
      .expect({
        data: {
          server: 'up',
          database: 'up',
        },
        success: true,
      });
  });

  afterAll(async () => {
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
  });
});
