import { Controller, Get, Req } from '@nestjs/common'
import { AuthenticatedRequest, Public } from '@app/auth'
import { ROUTES, SuccessResponse } from '@app/core'
import { HealthService } from '@app/health/health.service'

@Controller(ROUTES.healthz)
export class HealthCheckController {
  constructor(private readonly health: HealthService) {}

  @Public()
  @Get()
  async healthCheck(
    @Req() req: AuthenticatedRequest
  ): Promise<SuccessResponse> {
    return this.health.healthCheck()
  }
}
