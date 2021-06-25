import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "./dto";
import { UserRO, UsersRO } from "./interfaces/user.interface";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { User } from "./entity";
import { errorCodes, errorTypes } from "src/common/codes/error";
import { CreateOauthUserDto } from "./dto";
import { prismaOffsetPagination } from "src/utils/prisma";

@Injectable()
export class UserService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: CacheService
  ) {}

  async allUsers(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<UserRO>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = "createdAt",
      orderDirection = "desc",
    } = options;
    const result = await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: "user",
      prisma: this.db,
    });
    return result;
  }

  async create(user: CreateUserDto): Promise<UserRO> {
    try {
      // create new user
      const { password, ...update } = user;
      const newPassword = await this.createPassword(password);
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
        },
      });
      return new User(newUser);
    } catch (error) {
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = "User with email already exists";
      }
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.emailLogin"
      );
    }
  }

  async find(id: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { id }, include: {cart: true} });
    if (user) {
      return new User(user);
    }
    throw new CustomError(
      "User with id does not exist",
      errorCodes.RecordDoesNotExist
    );
  }

  async findAndUpdate(
    id: string,
    update: Partial<UpdateUserDto & { emailVerified: boolean }>
  ): Promise<UserRO> {
    try {
      const user = await this.db.user.update({
        where: { id },
        data: update,
      });
      return new User(user);
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.findAndUpdate"
      );
    }
  }

  async delete(id: string): Promise<UserRO> {
    try {
      const deleted = await this.db.user.update({
        where: { id },
        data: {
          active: false,
        }
      });
      return deleted;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.delete"
      );
    }
  }

  async createPassword(password: string | Buffer) {
    return argon2.hash(password);
  }

  async updatePassword(
    email: string,
    newPassword: string,
    oldPassword: string
  ) {
    const userOrNull = await this.verifyEmailPassword({
      email,
      password: oldPassword,
    });
    if (userOrNull) {
      const hasshedpw = await this.createPassword(newPassword);
      const updatedUser = await this.db.user.update({
        where: { email },
        data: { secrets: { update: { password: hasshedpw } } },
      });
      return updatedUser;
    }
    throw new CustomError(
      "Email Password combination does not match",
      errorTypes[errorCodes.AuthFailed],
      "UserService.updatePassword"
    );
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      // create new user
      const hasshedpw = await this.createPassword(newPassword);
      const updatedUser = await this.db.user.update({
        where: { email },
        data: { secrets: { update: { password: hasshedpw } } },
      });
      return updatedUser;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.resetPassword"
      );
    }
  }

  async createOauthAccount(user: CreateOauthUserDto): Promise<UserRO> {
    try {
      const newUser = await this.db.user.create({
        data: {
          ...user,
          cart: {
            create: {},
          },
        },
      });
      return newUser;
    } catch (error) {
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = "Account already present";
      }
      throw new CustomError(
        message,
        error.code,
        "UserService.createOauthAccount"
      );
    }
  }

  async findAndUpdateOauthAccount(
    user: Partial<CreateOauthUserDto>
  ): Promise<UserRO> {
    try {
      const updatedUser = await this.db.user.update({
        where: { oauthId: user.oauthId },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      if (error.code === errorCodes.RecordToUpdateNotFound) {
        // we create a new account
        return null;
      }
      let message: string = error?.meta?.cause || error.message;
      if (error.code === errorCodes.UniqueConstraintViolation) {
        message = "Account already present";
      }
      throw new CustomError(
        message,
        error.code,
        "UserService.findAndUpdateOauthAccount"
      );
    }
  }

  async verifyEmailPassword({
    email,
    password,
  }: Partial<LoginUserDto>): Promise<UserRO> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email,
        },
        include: {
          secrets: true,
        },
      });
      if (!user) {
        return null;
      }
      if (await argon2.verify(user.secrets.password, password)) {
        user.secrets = undefined;
        return user;
      }
      return null;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.verifyEmailPassword"
      );
    }
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (user) {
      return new User(user);
    }
    return null;
  }

  async findByEmailAndUpdate(
    email: string,
    update: { password: string }
  ): Promise<UserRO> {
    try {
      const user = await this.db.user.update({
        where: { email },
        data: update,
      });
      if (user) {
        return new User(user);
      }
      return null;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.findByEmailAndUpdate"
      );
    }
  }
}
