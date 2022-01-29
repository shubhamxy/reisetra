import app from './app'
import db from './db'
import cache from './cache'
import auth from './auth'
import services from './services'
import settings from './settings'

export const config = [app, db, cache, auth, settings, services]

// @TODO: Replace this w\ configService??
export default app()
export * from './pino'
export * from './app'
export * from './db'
export * from './cache'
export * from './auth'
export * from './services'
export * from './settings'
export * from './env.validation'
