import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User as UserModel } from '@prisma/client';
import * as argon2 from 'argon2';
import { errorResponse } from 'src/common/response/error';
import { PrismaService } from 'src/db/prisma.service';
import { BAD_REQUEST } from 'src/constants';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRO } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService, private readonly cache: RedisService) {}

  async findAll(): Promise<Partial<UserModel>[]> {
    return this.db.user.findMany({
      select: {
        email: true,
        name: true,
        dateOfBirth: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findOne({ email }: Partial<UserModel>): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    return this.buildUserRO(user);
  }

  async findAndVerify({ email, password }: LoginUserDto): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    if (await argon2.verify(user.password, password)) {
      return this.buildUserRO(user);
    }
    return null;
  }

  async create({ email, password }: CreateUserDto): Promise<UserRO> {
    // check uniqueness of email
    const userOrNone = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (userOrNone) {
      const errors = [{ source: 'email', message: 'Email already exists' }];
      throw new HttpException(errorResponse(BAD_REQUEST, errors), HttpStatus.BAD_REQUEST);
    }

    try {
      // create new user
      const hashedPw = await argon2.hash(password);
      let newUser = await this.db.user.create({
        data: {
          email,
          password: hashedPw,
        },
      });

      return this.buildUserRO(newUser);
    } catch (error) {
      const errors = [{ source: 'email', message: 'Email is required' }];
      throw new HttpException(error(BAD_REQUEST, errors), HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserRO> {
    let toUpdate = await this.db.user.findFirst({ where: { id } });
    delete toUpdate.password;
    // delete toUpdate.favorites;

    let updated = Object.assign(toUpdate, dto);
    return this.buildUserRO(updated);
  }

  async delete(email: string): Promise<UserRO> {
    const deleted = await this.db.user.delete({ where: { email: email } });
    return this.buildUserRO(deleted);
  }

  async findById(id: string): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      const errors = [{code: 0, message: 'User not found', source: 'user'}];
      throw new HttpException(errorResponse(BAD_REQUEST, errors), HttpStatus.BAD_REQUEST);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.db.user.findFirst({ where: { email } });
    return this.buildUserRO(user);
  }

  private buildUserRO(user: UserModel) {
    const userRO = user;
    user.password = undefined;
    return { user: userRO };
  }
}
