import { Injectable } from '@nestjs/common'
import { DbService } from '@app/db'
import { ConfigService } from '@nestjs/config'
import { AppEnv, Config } from '@app/config'

@Injectable()
export class UtilsService {
  private readonly app: AppEnv

  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService
  ) {
    this.app = config.get<AppEnv>(Config.app)
  }

  async testCommon() {
    return {}
  }
}
