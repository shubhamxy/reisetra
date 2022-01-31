import { Controller, Get } from '@nestjs/common'
import { Public } from 'src/auth/decorator/public.decorator'
import { SuccessResponse } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from 'src/config'
import { timeFn } from 'src/utils'
import { ROUTES } from 'src/constants'

@Controller(ROUTES.healthz)
export class HealthCheckController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly config: ConfigService
    ) {}

    @Public()
    @Get()
    async healthCheck(): Promise<SuccessResponse> {
        const database = Boolean(await this.prismaService.$executeRaw`SELECT 1`)
        return {
            version: this.config.get<AppEnv>('app').version,
            data: {
                server: 'up',
                database: database ? 'up' : 'down',
                uptime: timeFn(process.uptime()),
                ...(this.config.get<AppEnv>('app').debug
                    ? (this.config.get<AppEnv>('app') as any)
                    : {}),
            },
        }
    }
}
