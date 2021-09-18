import { Injectable } from '@nestjs/common'
import { AppEnv, Config } from '@app/config'
import { timeFn } from '@app/utils'
import { DbService } from '@app/db'
import { ConfigService } from '@nestjs/config'
import { Message } from '@app/core'
import { TemplateService } from '@app/aws'

const date = new Date()

@Injectable()
export class HealthService {
  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService,
    private readonly template: TemplateService
  ) {}

  async healthCheck() {
    const database = Boolean(await this.db.$executeRaw`SELECT 1`)
    return {
      message: Message.success,
      version: this.config.get<AppEnv>(Config.app).version,
      token: await this.template.createUnsubscribeToken('s.shubjain@gmail.com'),
      data: {
        server: 'up',
        database: database ? 'up' : 'down',
        uptime: timeFn(process.uptime()),
        deployedAt: date,
        ...(this.config.get<AppEnv>(Config.app).debug
          ? (this.config.get<AppEnv>(Config.app) as any)
          : {}),
      },
    }
  }
}
