/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { config as awsconfig } from 'aws-sdk'
import * as helmet from 'helmet'
import { AllExceptionsFilter } from './filter'
import { DataTransformInterceptor } from './interceptor'
import { ValidationPipe } from './pipe'
import { AppEnv, pinoConfig, ServicesEnv } from './config'
import { Logger, PinoLogger } from 'nestjs-pino'
import { PrismaService } from './modules/db/prisma.service'
import { NestExpressApplication } from '@nestjs/platform-express'

export const nestOptions = {
    logger: new Logger(new PinoLogger(pinoConfig), {}),
}

export const setupNestApp = (app: NestExpressApplication): AppEnv => {
    const reflector = app.get(Reflector)

    const configService = app.get(ConfigService)
    const servicesConfig = configService.get<ServicesEnv>('services')
    const appConfig = configService.get<AppEnv>('app')

    /**
     * AWS Config.
     */
    awsconfig.update({
        accessKeyId: servicesConfig.aws.accessKeyId,
        secretAccessKey: servicesConfig.aws.secretAccessKey,
        region: servicesConfig.aws.region,
    })

    app.use(helmet())
    app.set('trust proxy', 1)
    app.enableCors({
        ...appConfig.cors,
        credentials: true,
    })

    app.setGlobalPrefix(appConfig.apiPrefix)
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(reflector),
        new DataTransformInterceptor()
    )

    app.useGlobalFilters(new AllExceptionsFilter())
    app.useGlobalPipes(new ValidationPipe())

    const service = app.get(PrismaService)
    service.enableShutdownHooks(app)

    process.on('SIGINT', function () {
        service
            .$disconnect()
            .then(() => {
                process.exit(0)
            })
            .catch(() => {
                process.exit(1)
            })
    })
    return appConfig
}
