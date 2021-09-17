import { registerAs } from '@nestjs/config'
import { CONFIG, Environment } from './type'

export interface AppEnv {
    name: string
    nodeEnv: Environment
    appEnv: Environment
    debug: number
    isProduction: boolean
    service: string
    description: string
    port: number
    apiPrefix: string
    version: string
    host: string
    apiUrl: string
    clientUrl: string
    callbackUrl: string
    authUrl: string
    cmsUrl: string
    cdnUrl: string
    contactEmail: string
    protocol: string
    swagger: boolean
    cors: {
        allowedHeaders: string[]
        origin: string[]
        methods: string
    }
    socials: {
        instagram: string
        facebook: string
        whatsapp: string
    }
}

export const app = (): AppEnv => ({
    // APP
    isProduction: process.env.NODE_ENV === 'production',
    name: process.env.APP_NAME || 'SODA API V1',
    appEnv: (process.env.APP_ENV || 'production') as Environment,
    nodeEnv: (process.env.NODE_ENV || 'production') as Environment,
    debug: +process.env.APP_DEBUG || 1,
    service: process.env.SERVICE_NAME || 'soda',
    description: process.env.SERVICE_DESCRIPTION || 'Soda API v1',
    // API
    port: +process.env.PORT || 8080,
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    version: process.env.API_VERSION || '1.0.0',
    host: process.env.API_HOST || 'localhost',
    protocol: process.env.API_PROTOCOL || 'http',
    contactEmail: process.env.CONTACT_EMAIL || 'contact@reisetra.com',
    apiUrl: process.env.API_URL || '',
    clientUrl: process.env.CLIENT_URL || '',
    cmsUrl: process.env.CMS_CLIENT_URL || '',
    callbackUrl: process.env.CALLBACK_URL || '',
    authUrl: process.env.AUTH_CLIENT_URL || '',
    cdnUrl: process.env.CDN_URL || '',
    swagger: +process.env.ENABLE_SWAGGER === 1,
    cors: {
        allowedHeaders: String(
            process.env.ALLOWED_HEADERS ||
                'x-requested-with,content-type,authorization,x-refresh-token,x-csrf-token'
        ).split(','),
        origin: String(
            process.env.ORIGIN || `localhost:3000,${process.env.CLIENT_URL}`
        ).split(','),
        methods:
            process.env.METHODS || 'GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD',
    },
    socials: {
        facebook:
            process.env.SOCIALS_FACEBOOK || 'https://www.facebook.com/reisetra',
        instagram:
            process.env.SOCIALS_INSTAGRAM ||
            'https://www.instagram.com/reisetra_crafts',
        whatsapp:
            process.env.SOCIALS_WHATSAPP ||
            'https://api.whatsapp.com/send?phone=',
    },
})

export default registerAs(CONFIG.app, app)
