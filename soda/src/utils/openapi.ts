import {AppEnv} from '../config';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication, appConfig: AppEnv) {
  const openapiconfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addOAuth2({ type: 'oauth2' })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, openapiconfig);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customfavIcon: '',
    customSiteTitle: 'API Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);
}
