import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './common/validation.pipe';
import { DataTransformInterceptor } from './common/data.interceptor';
import { NestApplicationOptions } from '@nestjs/common';

import {API_PREFIX, PORT} from './config';
import { ErrorsInterceptor } from './common/error.interceptor';

const options: NestApplicationOptions  = {
  cors: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options)
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DataTransformInterceptor(), new ErrorsInterceptor())

  await app.listen(PORT)
}
bootstrap()
