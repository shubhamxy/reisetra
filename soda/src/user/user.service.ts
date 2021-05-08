import { HttpStatus, Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import * as argon2 from 'argon2';
import { CustomError, errorResponse, Exception } from 'src/common/response/error';
import { PrismaService } from 'src/db/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRO, UsersRO } from './interfaces/user.interface';
import {
  CursorPaginationOptionsInterface,
  CursorPaginationResultInterface,
  OffsetPaginationOptionsInterface,
  OffsetPaginationResultInterface,
} from 'src/common/pagination';
import { UserEntity } from './entity';
import { errorCodes, errorTypes } from 'src/common/codes/error';
import { CreateOauthUserDto } from './dto/createUser.dto';
import { prismaOffsetPagination } from 'src/utils/prisma';

const SelectUserFeilds = {
  id: true,
  email: true,
  name: true,
  dateOfBirth: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  avatar: true,
};

@Injectable()
export class UserService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: RedisService,
  ) {}
  async findAllOffset(
    options: OffsetPaginationOptionsInterface,
  ): Promise<OffsetPaginationResultInterface<Partial<UserModel>>> {
    try {
      const users = await this.db.user.findMany({
        take: options.limit,
        skip: options.page,
        orderBy: {
          createdAt: 'desc',
        },
        select: SelectUserFeilds,
      });
      const total = await this.db.user.count({});
      return {
        results: users,
        pageCount: users.length,
        totalCount: total,
      };
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findAllOffset',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllCursor(
    options: CursorPaginationOptionsInterface,
  ): Promise<CursorPaginationResultInterface<Partial<UserModel>>> {
    const {cursor, size = 10, buttonNum = 10, orderBy = 'createdAt', orderDirection = 'desc'} = options;
    try {
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        select: SelectUserFeilds,
        model: 'User',
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findAllCursor',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAndVerify({ email, password }: LoginUserDto): Promise<UserRO> {
    try {
      const user = await this.db.user.findUnique({ where: { email } });
      if (!user) {
        return null;
      }
      if (await argon2.verify(user.password, password)) {
        user.password = undefined;
        return user;
      }
      return null;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findAndVerify',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPassword(password: string | Buffer) {
    return argon2.hash(password);
  }

  async create(user: CreateUserDto): Promise<UserRO> {
    try {
      // create new user
      user.password = await this.createPassword(user.password);
      const newUser = await this.db.user.create({
        data: user,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'User with email already exists';
      }
      throw new Exception(
        {
          message,
          code: error.code,
          type: errorTypes[error.code],
          source: 'UserService.create',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePassword(
    email: string,
    newPassword: string,
    oldPassword: string,
  ) {
    const userOrNull = await this.findAndVerify({ email, password: oldPassword });
    if (userOrNull) {
      const hasshedpw = await this.createPassword(newPassword);
      const updatedUser = await this.db.user.update({
        where: { email },
        data: { password: hasshedpw },
      });
      updatedUser.password = undefined;
      return updatedUser;
    }
    throw new Exception(
      {
        message: 'Email Password combination does not match',
        code: errorCodes.AuthFailed,
        type: errorTypes[errorCodes.AuthFailed],
        source: 'UserService.updatePassword',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      // create new user
      const hasshedpw = await this.createPassword(newPassword);
      const updatedUser = await this.db.user.update({
        where: { email },
        data: { password: hasshedpw },
      });
      updatedUser.password = undefined;
      return updatedUser;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          type: errorTypes[error.code],
          source: 'UserService.resetPassword',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createOauthAccount(user: CreateOauthUserDto): Promise<UserRO> {
    try {
      const newUser = await this.db.user.create({
        data: user,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'Account already present';
      }
      throw new Exception(
        {
          message,
          code: error.code,
          type: errorTypes[error.code],
          source: 'UserService.createOauthAccount',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAndUpdateOauthAccount(user: CreateOauthUserDto): Promise<UserRO> {
    try {
      const updatedUser = await this.db.user.update({
        where: { oauthId: user.oauthId },
        data: user,
      });
      updatedUser.password = undefined;
      return updatedUser;
    } catch (error) {
      if (error.code === errorCodes.RecordToUpdateNotFound) {
        // we create a new account
        return null;
      }
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = 'Account already present';
      }
      throw new Exception(
        {
          message,
          code: error.code,
          type: errorTypes[error.code],
          source: 'UserService.findAndUpdateOauthAccount',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<UserRO> {
    try {
      const deleted = await this.db.user.delete({ where: { id } });
      deleted.password = undefined;
      return deleted;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.delete',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAndUpdate(
    id: string,
    update: { emailVerified: boolean },
  ): Promise<UserRO> {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: update,
        include: { profile: true },
      });
      user.password = undefined;
      return new UserEntity(user);
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findAndUpdate',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async find(id: string): Promise<UserRO> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        include: { profile: true },
      });
      if (user) {
        user.password = undefined;
        return new UserEntity(user);
      }
      throw new CustomError(
        'User does not exist',
        errorCodes.RecordDoesNotExist,
      );
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.find',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmail(email: string): Promise<UserRO> {
    try {
      const user = await this.db.user.findUnique({ where: { email } });
      user.password = undefined;
      if (user) {
        return new UserEntity(user);
      }
      return null;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findByEmail',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByEmailAndUpdate(
    email: string,
    update: { password: string },
  ): Promise<UserRO> {
    try {
      const user = await this.db.user.update({
        where: { email },
        data: update,
        include: { profile: true },
      });
      user.password = undefined;
      if (user) {
        return new UserEntity(user);
      }
      return null;
    } catch (error) {
      throw new Exception(
        {
          message: error?.meta?.cause || error.message,
          code: error.code,
          source: 'UserService.findByEmail',
          type: errorTypes[error.code],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
