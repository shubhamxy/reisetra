import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  CustomError,
  errorCodes,
  errorTypes,
} from '@app/core'
import { DbService } from '@app/db'
import {
  CreateOauthUserDTO,
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from './dto'
import { UserRO } from '@app/user'
import { User } from './entity'
import { prismaOffsetPagination } from '@app/utils'

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  async allUsers(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<UserRO>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc',
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

  async create(user: CreateUserDTO): Promise<UserRO> {
    try {
      // create new user
      const { clientId, password, ...update } = user
      const newPassword = await this.createPassword(password)
      const newUser = await this.db.user.create({
        data: {
          ...update,
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
    } catch (error) {
      let message: string = error?.meta?.cause || error.message
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'User with email already exists'
      }
      throw new CustomError(
        error?.meta?.cause || message,
        error.code,
        'UserService.emailLogin'
      )
    }
  }

  async find(id: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({
      where: { id },
      include: { cart: true },
    })
    if (user) {
      return new User(user)
    }
    throw new CustomError(
      'User with id does not exist',
      errorCodes.RecordDoesNotExist
    )
  }

  async findAndUpdate(
    id: string,
    update: Partial<UpdateUserDTO & { emailVerified: boolean }>
  ): Promise<UserRO> {
    try {
      const { clientId, ...body } = update
      const user = await this.db.user.update({
        where: { id },
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
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.findAndUpdate'
      )
    }
  }

  async delete(id: string): Promise<UserRO> {
    try {
      return await this.db.user.update({
        where: { id },
        data: {
          active: false,
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.delete'
      )
    }
  }

  async createPassword(password: string | Buffer) {
    return argon2.hash(password)
  }

  async updatePassword(
    email: string,
    newPassword: string,
    oldPassword: string
  ) {
    const userOrNull = await this.verifyEmailPassword({
      email,
      password: oldPassword,
    })
    if (userOrNull) {
      const hasshedpw = await this.createPassword(newPassword)
      return await this.db.user.update({
        where: { email },
        data: { secrets: { update: { password: hasshedpw } } },
      })
    }
    throw new CustomError(
      'Email Password combination does not match',
      errorTypes[errorCodes.AuthFailed],
      'UserService.updatePassword'
    )
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      // create new user
      const hasshedpw = await this.createPassword(newPassword)
      return await this.db.user.update({
        where: { email },
        data: { secrets: { update: { password: hasshedpw } } },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.resetPassword'
      )
    }
  }

  async createOauthAccount(user: CreateOauthUserDTO): Promise<UserRO> {
    try {
      const { roles, ...update } = user
      return await this.db.user.create({
        data: {
          ...update,
          roles: {
            set: roles,
          },
          cart: {
            create: {},
          },
          client: {
            connect: {
              clientId: update.client,
            },
          },
        },
      })
    } catch (error) {
      let message: string = error?.meta?.cause || error.message
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'Account already present, please login with user credentials.'
      }
      throw new CustomError(
        message,
        error.code,
        'UserService.createOauthAccount'
      )
    }
  }

  async findAndUpdateOauthAccount(
    user: Partial<CreateOauthUserDTO>
  ): Promise<UserRO> {
    try {
      return await this.db.user.update({
        where: { oauthId: user.oauthId },
        data: user,
      })
    } catch (error) {
      if (error.code === errorCodes.RecordToUpdateNotFound) {
        // we create a new account
        return null
      }
      let message: string = error?.meta?.cause || error.message
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'Account already present, please login with user credentials.'
      }
      throw new CustomError(
        message,
        error.code,
        'UserService.findAndUpdateOauthAccount'
      )
    }
  }

  async verifyEmailPassword({
    email,
    password,
  }: Partial<LoginUserDTO>): Promise<UserRO> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email,
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
    } catch (error) {
      console.log({ error })

      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.verifyEmailPassword'
      )
    }
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { email } })
    if (user) {
      return new User(user)
    }
    return null
  }

  async findByEmailAndUpdate(
    email: string,
    update: UpdateUserDTO
  ): Promise<UserRO> {
    try {
      const user = await this.db.user.update({
        where: { email },
        data: update,
      })
      if (user) {
        return new User(user)
      }
      return null
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'UserService.findByEmailAndUpdate'
      )
    }
  }
}