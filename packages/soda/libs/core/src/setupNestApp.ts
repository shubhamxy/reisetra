/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { PUBLIC_DIR, VIEWS_DIR } from '@app/core/core.const'

import { join } from 'path'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { config as awsconfig } from 'aws-sdk'
import * as helmet from 'helmet'
import { AllExceptionsFilter } from './filter'
import { DataTransformInterceptor } from './interceptor'
import { ValidationPipe } from './pipe'
import { AppEnv, Config, ServicesEnv, settings } from '@app/config'
import { Logger, PinoLogger } from 'nestjs-pino'
import { DbService } from '@app/db'
import { NestExpressApplication } from '@nestjs/platform-express'

export const nestOptions = () => ({
  logger: new Logger(new PinoLogger(settings().pino), {}),
})

export const setupNestApp = (app: NestExpressApplication): AppEnv => {
  const reflector = app.get(Reflector)

  const configService = app.get(ConfigService)
  const awsConfig = configService.get<ServicesEnv>(Config.services).aws
  const appConfig = configService.get<AppEnv>(Config.app)

  /**
   * AWS Config.
   */
  awsconfig.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region,
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
  app.useStaticAssets(join(process.env.NODE_PATH, PUBLIC_DIR))
  app.setBaseViewsDir(join(process.env.NODE_PATH, VIEWS_DIR))
  app.setViewEngine('hbs')

  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())

  const service = app.get(DbService)
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
