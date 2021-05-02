import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
import { DataTransformInterceptor } from './common/interceptor/data.interceptor';
import { ErrorsInterceptor } from './common/interceptor/error.interceptor';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { API_PREFIX, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, PORT } from './config';

const compression = require('compression');

const options: NestApplicationOptions  = {
  cors: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options)
  app.use(compression());

  config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DataTransformInterceptor(), new ErrorsInterceptor());

  await app.listen(PORT)
}
bootstrap()
