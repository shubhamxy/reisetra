import { registerAs } from '@nestjs/config';

enum Environment {
  Local = 'localhost',
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export interface AppEnv {
  name: string;
  env: string;
  debug: number;
  isProduction: boolean;
  service: string;
  description: string;
  port: string;
  apiPrefix: string;
  version: string;
  host: string;
  apiUrl: string;
  clientUrl: string;
  protocol: string;
  swagger: boolean;
  cors: {
    allowedHeaders: string;
    origin: string;
    methods: string;
  };
}

export const app = (): AppEnv => ({
  // APP
  isProduction: process.env.NODE_ENV === 'production',
  name: process.env.APP_NAME || 'NestJS App',
  env: process.env.APP_ENV || 'local',
  debug: +process.env.APP_DEBUG || 1,
  service: process.env.SERVICE_NAME || 'soda',
  description: process.env.SERVICE_DESCRIPTION || 'Soda API v1',
  // API
  port: process.env.PORT || '8080',
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  version: process.env.API_VERSION || '1.0.0',
  host: process.env.API_HOST || 'localhost',
  protocol: process.env.API_PROTOCOL || 'http',

  apiUrl: process.env.API_URL || 'http://localhost:8080/api/v1',
  clientUrl: process.env.CLIENT_URL,
  swagger: true,
  cors: {
    allowedHeaders:
      process.env.ALLOWED_HEADERS ||
      'x-requested-with, content-type, authorization, x-refresh-token, X-CSRF-Token',
    origin: process.env.ORIGIN || `localhost:3000, ${process.env.FRONTEND_URL}`,
    methods:
      process.env.METHODS || 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD',
  },
});

export default registerAs('app', app);
