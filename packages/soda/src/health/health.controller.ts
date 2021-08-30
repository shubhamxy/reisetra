import { Controller, Get } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { Public } from 'src/auth/decorator/public.decorator'
import { SuccessResponse } from 'src/common/response'
import { PrismaService } from '../common/modules/db/prisma.service'
import { ConfigService } from '@nestjs/config'
import { AppEnv } from 'src/config'

function timeFn(sec_num: number) {
    sec_num = parseInt(sec_num + '', 10)
    let hours: string | number = Math.floor(sec_num / 3600)
    let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60)
    let seconds: string | number = sec_num - hours * 3600 - minutes * 60
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    const time = hours + ':' + minutes + ':' + seconds
    return time
}

@Controller('healthz')
export class HealthCheckController {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly logger: PinoLogger,
        private readonly config: ConfigService
    ) {
        logger.setContext(HealthCheckController.name)
    }

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
            },
        }
    }
}
