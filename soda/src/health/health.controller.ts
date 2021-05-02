import { Role } from '.prisma/client';
import {
  Controller,
  Get,
  Req,
} from '@nestjs/common'
import { Public } from 'src/auth/decorator/public.decorator';
import { PrismaService } from '../db/prisma.service'

@Controller('__internal/health')
export class HealthCheckController {
  constructor(private readonly prismaService: PrismaService) { }
  @Public()
  @Get()
  healthCheck(@Req() request): Record<string, any> {
    return {
      soda: {"status": "ok"},
      message: "Success"
    };
  }
}
