import {
  ClassSerializerInterceptor,
  NestApplicationOptions,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { config, SES } from 'aws-sdk';
import { AppModule } from './app.module';
import { DataTransformInterceptor } from './common/interceptor/data.interceptor';
// import { ErrorsInterceptor } from './common/interceptor/error.interceptor';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
// import * as cookieParser from 'cookie-parser';

import { ValidationPipe } from './common/pipe/validation.pipe';
import {
  API_PREFIX,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  AWS_DEFAULT_REGION,
  PORT,
} from './config';
import { AllExceptionsFilter } from './common/filter/exeption.filter';

const compression = require('compression');

const options: NestApplicationOptions = {
  cors: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.use(compression());
  app.use(helmet());
  // app.enableCors({
  //   allowedHeaders: 'X-Requested-With, content-type, authorization, x-refresh-token, x-auth-token',
  //   methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD',
  //   origin: 'localhost',
  // });

  // app.use(cookieParser());
  // app.use(csurf({cookie: true}));

  config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_DEFAULT_REGION,
  });
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalInterceptors(
    new DataTransformInterceptor(),
    // new ErrorsInterceptor(),
  );
  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(PORT);
}
bootstrap();
