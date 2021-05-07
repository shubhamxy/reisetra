import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User as UserModel } from '@prisma/client';
import * as argon2 from 'argon2';
import { errorResponse, Exception } from 'src/common/response/error';
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
      page_count: users.length,
      total_count: total,
    };
  }

  async findAllCursor(
    options: CursorPaginationOptionsInterface,
  ): Promise<CursorPaginationResultInterface<Partial<UserModel>>> {
    const users = await this.db.user.findMany({
      select: SelectUserFeilds,
    });
    return {
      results: users,
    };
  }

  async findOne({ id }: Partial<UserModel>): Promise<UserRO> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    user.password = undefined
    if (!user) {
      return null;
    }
    return new UserEntity(user);
  }

  async findAndVerify({ email, password }: LoginUserDto): Promise<UserRO> {
    const user = await this.db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    if (await argon2.verify(user.password, password)) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async create(user: CreateUserDto): Promise<UserRO> {
    try {
      // create new user
      user.password = await argon2.hash(user.password);
      let newUser = await this.db.user.create({
        data: user,
      });
      newUser.password = undefined;

      return newUser;
    } catch (error) {
      let message;
      let type;
      if(error.code === errorCodes.UniqueConstraintViolation) {
        message = "Email and password do not match"
        type = errorTypes[error.code];
      }
      throw new Exception({message, code: error.code, type, source: 'UserService.create'}, HttpStatus.BAD_REQUEST);
    }
  }


  async createOauthAccount(user: CreateOauthUserDto): Promise<UserRO> {
    try {
      let newUser = await this.db.user.create({
        data: user,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      let message: string;
      const type = errorTypes[error.code];
      if(error.code === errorCodes.UniqueConstraintViolation) {
        message = "Account already present"
      } else {
        message = error?.meta?.cause
      }
      throw new Exception({message, code: error.code, type, source: 'UserService.createOauthAccount'}, HttpStatus.BAD_REQUEST);
    }
  }

  async findAndUpdateOauthAccount(user: CreateOauthUserDto): Promise<UserRO> {
    try {
      let updatedUser = await this.db.user.update({
        where: { oauthId: user.oauthId},
        data: user,
      });
      updatedUser.password = undefined;
      return updatedUser;
    } catch (error) {
      let message: string;
      const type = errorTypes[error.code];
      if (error.code === errorCodes.RecordToUpdateNotFound) {
        return null;
      } if(error.code === errorCodes.UniqueConstraintViolation) {
        message = "Account already present"
      } else {
        message = error?.meta?.cause
      }
      throw new Exception({message, code: error.code, type, source: 'UserService.findAndUpdateOauthAccount'}, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserRO> {
    let toUpdate = await this.db.user.findFirst({ where: { id } });
    toUpdate.password = undefined;

    let updated = Object.assign(toUpdate, dto);
    return new UserEntity(updated);
  }

  async delete(email: string): Promise<UserRO> {
    const deleted = await this.db.user.delete({ where: { email: email } });
    return deleted;
  }

  async findById(id: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { id } });
    user.password = undefined;

    if (!user) {
      const errors = [{ code: 0, message: 'User not found', source: 'user' }];
      throw new HttpException(
        errorResponse(errors),
        HttpStatus.BAD_REQUEST,
      );
    }

    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { email } });
    user.password = undefined;
    if(user) {
      return new UserEntity(user);
    }
    return null;
  }
}
