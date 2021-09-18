import { registerAs } from '@nestjs/config'
import { Config } from './type'
import { pinoConfig, PinoConfig } from './pino'

export interface SettingsEnv {
  pino: PinoConfig
  throttle: {
    limit: number
    ttl: number
  }
}

export const settings = (): SettingsEnv => ({
  pino: pinoConfig,
  throttle: {
    limit: +process.env.THROTTLE_LIMIT || 60,
    ttl: +process.env.THROTTLE_TTL || 120,
  },
})
export default registerAs(Config.settings, settings)
