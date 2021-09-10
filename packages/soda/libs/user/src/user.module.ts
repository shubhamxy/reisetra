import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { DbService } from '@app/db'
import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [DbService, UserService],
  exports: [UserService],
})
export class UserModule {}
