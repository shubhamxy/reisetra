import { registerAs } from '@nestjs/config'
import { CONFIG } from './type'

export interface CacheEnv {
    enable: boolean
    host: string
    port: string
    cacheTTL: number
}

export const cache = (): CacheEnv => ({
    enable: +process.env.ENABLE_REDIS === 1 || false,
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
    cacheTTL: 120,
})
export default registerAs(CONFIG.cache, cache)
