import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import {
  AppError,
  AuthFailed,
  CursorPagination,
  CursorPaginationResultInterface,
  RecordDoesNotExist,
} from '@app/core'
import { DbService } from '@app/db'
import { CreateOauthUserDTO, UpdateUserDTO, UserDTO } from './dto'
import { UserRO } from '@app/user'
import { User } from './entity'
import { createHashedPassword, prismaOffsetPagination } from '@app/utils'
import {
  BUTTON_NUMBER,
  CREATED_AT,
  DESC,
  EMAIL_PASSWORD_DOES_NOT_MATCH,
  PAGE_SIZE,
  USER_DOES_NOT_EXISTS,
} from '@app/user/user.const'
import { Role } from '@app/auth'
import { ErrorHandler } from '@app/core/decorators'

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async allUsers(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<UserRO>> {
    const {
      cursor,
      size = PAGE_SIZE,
      buttonNum = BUTTON_NUMBER,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options
    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: 'user',
      prisma: this.db,
    })
  }

  @ErrorHandler()
  async create(user: UserDTO): Promise<UserRO> {
    // create new user
    const { clientId, password, roles, ...update } = user
    const newPassword = await createHashedPassword(password)
    const newUser = await this.db.user.create({
      data: {
        ...update,
        username: user.username || user.email || user.phone,
        roles: [Role.USER],
        cart: {
          create: {},
        },
        secrets: {
          create: {
            password: newPassword,
          },
        },
        ...(clientId
          ? {
              client: {
                connect: {
                  clientId,
                },
              },
            }
          : {}),
      },
    })
    return new User(newUser)
  }

  async findByUsername(username: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({
      where: { username },
      include: { cart: true },
    })
    if (user) {
      return new User(user)
    }
    throw new AppError(USER_DOES_NOT_EXISTS, RecordDoesNotExist)
  }

  @ErrorHandler()
  async findByUsernameAndUpdate(
    username: string,
    update: Partial<UpdateUserDTO>
  ): Promise<UserRO> {
    const { clientId, ...body } = update
    const user = await this.db.user.update({
      where: { username },
      data: {
        ...body,
        ...(clientId
          ? {
              client: {
                connect: {
                  clientId,
                },
              },
            }
          : {}),
      },
    })
    return new User(user)
  }

  @ErrorHandler()
  async deleteByUsername(username: string): Promise<UserRO> {
    return await this.db.user.update({
      where: { username },
      data: {
        active: false,
      },
    })
  }

  @ErrorHandler()
  async updatePassword(
    username: string,
    newPassword: string,
    oldPassword: string
  ) {
    const userOrNull = await this.verifyUsernamePassword({
      username,
      password: oldPassword,
    })
    if (userOrNull) {
      const hashedpw = await createHashedPassword(newPassword)
      return await this.db.user.update({
        where: { username },
        data: { secrets: { update: { password: hashedpw } } },
      })
    }
    throw new AppError(EMAIL_PASSWORD_DOES_NOT_MATCH, AuthFailed)
  }

  @ErrorHandler()
  async resetPassword(username: string, newPassword: string) {
    // create new user
    const hashedpw = await createHashedPassword(newPassword)
    return await this.db.user.update({
      where: { username },
      data: { secrets: { update: { password: hashedpw } } },
    })
  }

  @ErrorHandler()
  async createOauthAccount(user: CreateOauthUserDTO): Promise<UserRO> {
    const { roles, clientId, ...update } = user
    return await this.db.user.create({
      data: {
        ...update,
        roles: {
          set: roles,
        },
        cart: {
          create: {},
        },
        ...(clientId
          ? {
              client: {
                connect: {
                  clientId,
                },
              },
            }
          : {}),
      },
    })
  }

  @ErrorHandler()
  async findAndUpdateOauthAccount(user: CreateOauthUserDTO): Promise<UserRO> {
    return await this.db.user.update({
      where: { oauthId: user.oauthId },
      data: user,
    })
  }

  @ErrorHandler()
  async verifyUsernamePassword({
    username,
    password,
  }: Partial<UpdateUserDTO>): Promise<UserRO> {
    const user = await this.db.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }, { phone: username }],
      },
      include: {
        secrets: true,
      },
    })
    if (!user || !user.secrets || !user.secrets.password) {
      return null
    }
    if (await argon2.verify(user.secrets.password, password)) {
      user.secrets = undefined
      return user
    }
    return null
  }

  @ErrorHandler()
  async verifyEmailPassword({
    email,
    password,
  }: Partial<UpdateUserDTO>): Promise<UserRO> {
    const user = await this.db.user.findFirst({
      where: { email: email },
      include: {
        secrets: true,
      },
    })
    if (!user || !user.secrets || !user.secrets.password) {
      return null
    }
    if (await argon2.verify(user.secrets.password, password)) {
      user.secrets = undefined
      return user
    }
    return null
  }

  @ErrorHandler()
  async findByPhoneAndUpdate(
    phone: string,
    update: Partial<UpdateUserDTO>
  ): Promise<UserRO> {
    const user = await this.db.user.update({
      where: {
        phone,
      },
      data: update,
    })
    if (user) {
      return new User(user)
    }
    return null
  }
}
