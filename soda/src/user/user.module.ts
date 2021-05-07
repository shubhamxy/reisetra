import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { PrismaService } from '../db/prisma.service'
import { UserService } from './user.service'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}


