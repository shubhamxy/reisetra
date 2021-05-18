import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { config as awsconfig } from "aws-sdk";
import * as helmet from "helmet";
import { AllExceptionsFilter } from "./common/filter";
import { DataTransformInterceptor } from "./common/interceptor";
import { ValidationPipe } from "./common/pipe";
import { AppEnv, ServicesEnv } from "./config";
import { pinoConfig } from "./config";
import { Logger, PinoLogger } from "nestjs-pino";

export const nestOptions = {
  logger: new Logger(new PinoLogger(pinoConfig), {}),
};

export const setupNestApp = (app: INestApplication): AppEnv => {
  const configService = app.get(ConfigService);
  const servicesConfig = configService.get<ServicesEnv>("services");
  const appConfig = configService.get<AppEnv>("app");

  app.use(helmet());
  app.enableCors({
    allowedHeaders: appConfig.cors.allowedHeaders,
    methods: appConfig.cors.methods,
    origin: appConfig.cors.origin,
    credentials: true,
  });

  const reflector = app.get(Reflector);
  app.setGlobalPrefix(appConfig.apiPrefix);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new DataTransformInterceptor()
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  awsconfig.update({
    accessKeyId: servicesConfig.aws.accessKeyId,
    secretAccessKey: servicesConfig.aws.secretAccessKey,
    region: servicesConfig.aws.region,
  });

  return appConfig;
};
