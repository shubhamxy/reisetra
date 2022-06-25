import { Controller, Get, Render, Req } from '@nestjs/common'
import { AuthenticatedRequest, Public } from '@app/auth'
import { Routes, SuccessResponse } from '@app/core'
import { UtilsService } from '@app/utils/utils.service'

@Controller(Routes.utils)
export class UtilsController {
  constructor(private readonly utils: UtilsService) {}

  @Public()
  @Get()
  @Render('mail/common')
  async testCommon(@Req() req: AuthenticatedRequest): Promise<SuccessResponse> {
    return this.utils.testCommon()
  }
}
