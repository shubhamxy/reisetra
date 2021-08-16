/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { config as awsconfig } from "aws-sdk";
import * as helmet from "helmet";
import { AllExceptionsFilter } from "./common/filter";
import { DataTransformInterceptor } from "./common/interceptor";
import { ValidationPipe } from "./common/pipe";
import { AppEnv, ServicesEnv, pinoConfig } from "./config";
import { Logger, PinoLogger } from "nestjs-pino";
import { PrismaService } from "./common/modules/db/prisma.service";
import { NestExpressApplication } from "@nestjs/platform-express";

export const nestOptions = {
    logger: new Logger(new PinoLogger(pinoConfig), {}),
};

export const setupNestApp = (app: NestExpressApplication): AppEnv => {
    const configService = app.get(ConfigService);
    const servicesConfig = configService.get<ServicesEnv>("services");
    const appConfig = configService.get<AppEnv>("app");

    app.use(helmet());
    app.set("trust proxy", 1);
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
    const service = app.get(PrismaService);
    service.enableShutdownHooks(app);

    process.on("SIGINT", function () {
        const prisma = app.get(PrismaService);
        prisma
            .$disconnect()
            .then(() => {
                process.exit(0);
            })
            .catch((_error) => {
                process.exit(1);
            });
    });

    return appConfig;
};
