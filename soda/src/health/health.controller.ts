import { Role } from '.prisma/client';
import {
  Controller,
  Get,
  Req,
} from '@nestjs/common'
import { Public } from 'src/auth/decorator/public.decorator';
import { SuccessResponse } from 'src/common/response';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from '../db/prisma.service'

@Controller('__internal/health')
export class HealthCheckController {
  constructor(private readonly prismaService: PrismaService, private readonly redis: RedisService) { }
  @Public()
  @Get()
  async healthCheck(@Req() request): Promise<SuccessResponse> {
    // const database = Boolean(await this.prismaService.$executeRaw('SELECT 1'));
    // const redis = Boolean(await this.redis.ping());
    return {
      data: {
        server: 'up',
        // database: database ? 'up' : 'down',
        // redis: redis ? 'up' : 'down',
      },
    }
  }
}
