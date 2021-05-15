require('dotenv').config();
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { config as awsconfig } from 'aws-sdk';
import * as helmet from 'helmet';
import { Logger, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/exeption.filter';
import { DataTransformInterceptor } from './common/interceptor/data.interceptor';
// import { ErrorsInterceptor } from './common/interceptor/error.interceptor';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { AppEnv, pinoConfig, ServicesEnv } from './config';
import { setupSwagger } from './utils/openapi';

export const setupNestApp = (app: INestApplication): AppEnv => {
  const configService = app.get(ConfigService);
  const servicesConfig = configService.get<ServicesEnv>("services");
  const appConfig = configService.get<AppEnv>("app");

  app.use(helmet());
  app.enableCors({
    allowedHeaders: appConfig.cors.allowedHeaders,
    methods: appConfig.cors.methods,
    origin: appConfig.cors.origin,
  })

  const reflector = app.get(Reflector);
  app.setGlobalPrefix(appConfig.apiPrefix);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new DataTransformInterceptor(),
    // new ErrorsInterceptor(),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  if (appConfig.swagger) {
    setupSwagger(app, appConfig);
  }

  awsconfig.update({
    accessKeyId: servicesConfig.aws.accessKeyId,
    secretAccessKey: servicesConfig.aws.secretAccessKey,
    region: servicesConfig.aws.region,
  });

  return appConfig;
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new Logger(new PinoLogger(pinoConfig), {}),
  });
  const config= setupNestApp(app);
  await app.listen(config.port);
}

bootstrap();
