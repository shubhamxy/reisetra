import { ConfigService } from '@nestjs/config'
import { plainToClass } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import { AppEnv } from './app'
import { AuthEnv } from './auth'
import { DBEnv } from './db'
import { CacheEnv } from './cache'
import { ServicesEnv } from './services'
import { SettingsEnv } from './settings'
import { CONFIG } from './type'

export class EnviromentVars {
    //  APP
    @IsString()
    NODE_ENV: string

    @IsString()
    APP_NAME: string

    @IsString()
    APP_ENV: string

    @IsString()
    APP_DEBUG: string

    @IsString()
    SERVICE_NAME: string

    @IsString()
    SERVICE_DESCRIPTION: string

    //  API
    @IsString()
    PORT: string

    @IsString()
    API_PREFIX: string

    @IsString()
    API_VERSION: string

    @IsString()
    API_HOST: string

    @IsString()
    API_PROTOCOL: string

    @IsString()
    API_URL: string

    //  CLIENTS
    @IsString()
    CLIENT_URL: string

    //  CORS
    @IsString()
    ALLOWED_HEADERS: string

    @IsString()
    ORIGIN: string

    @IsString()
    METHODS: string

    //  REDIS
    @IsString()
    REDIS_HOST: string

    @IsString()
    REDIS_PORT: string

    //  DATABASE
    @IsString()
    DATABASE_URL: string

    @IsString()
    POSTGRES_USER: string

    @IsString()
    POSTGRES_DB: string

    @IsString()
    POSTGRES_PASSWORD: string

    //  MAILER
    @IsString()
    EMAIL_SENDER_NAME: string

    //  AWS
    @IsString()
    AWS_ACCESS_KEY_ID: string

    @IsString()
    AWS_SECRET_KEY: string

    //  S3
    @IsString()
    AWS_S3_BUCKET_NAME: string

    @IsString()
    AWS_S3_REGION: string

    //  SES
    @IsString()
    AWS_SES_ENDPOINT: string

    @IsString()
    AWS_SES_DEFAULT_EMAIL_SENDER: string

    @IsString()
    AWS_SES_REGION: string

    //  AUTH
    @IsString()
    ISSUER: string

    @IsString()
    AUDIENCE: string

    @IsString()
    JWT_ACCESS_TOKEN_SECRET: string

    @IsString()
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: string // 3600000

    @IsString()
    JWT_REFRESH_TOKEN_SECRET: string

    @IsString()
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: string // 864000000

    @IsString()
    GOOGLE_OAUTH_CLIENT_ID: string

    @IsString()
    GOOGLE_OAUTH_CLIENT_SECRET: string

    @IsString()
    GOOGLE_OAUTH_CLIENT_CALLBACK_URL: string
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(EnviromentVars, config, {
        enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    })

    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validatedConfig
}

export const getConfig = (configService: ConfigService) => ({
    app: configService.get<AppEnv>(CONFIG.app),
    db: configService.get<DBEnv>(CONFIG.db),
    services: configService.get<ServicesEnv>(CONFIG.services),
    auth: configService.get<AuthEnv>(CONFIG.auth),
    cache: configService.get<CacheEnv>(CONFIG.cache),
    setting: configService.get<SettingsEnv>(CONFIG.settings),
})
