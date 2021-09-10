import { validate } from './env.validation'
import app from './app'
import db from './db'
import cache from './cache'
import auth from './auth'
import services from './services'
import settings from './settings'

export const config = [app, db, cache, auth, settings, services]

export const configOptions = {
  isGlobal: true,
  load: config,
  cache: true,
  validationOptions: { config },
  validate,
}

// @TODO: Replace this w\ configService??
export * from './app'
export * from './db'
export * from './cache'
export * from './auth'
export * from './services'
export * from './settings'
export * from './type'
