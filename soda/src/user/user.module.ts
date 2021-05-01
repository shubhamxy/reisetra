import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { PrismaService } from '../common/prisma.service'
import { UserService } from './service/user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}


