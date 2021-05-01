import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common'
import getYamlObj from 'src/utils/yaml';
import { PrismaService } from '../common/prisma.service'

@Controller('__internal/health')
export class HealthCheckController {
  constructor(private readonly prismaService: PrismaService) { }
  @Get()
  healthCheck(@Req() request): Record<string, string> {
    return {
      "status": "ok",
    };
  }
}
