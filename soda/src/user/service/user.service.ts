import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User as UserModel } from '@prisma/client';
import * as argon2 from 'argon2';
import { validate } from 'class-validator';
import { errorResponse } from 'src/common/errorResponse';
import { PrismaService } from 'src/common/prisma.service';
import { BAD_REQUEST } from 'src/constants';
import { SECRET } from '../../config';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto';
import { UserRO } from '../interfaces/user.interface';
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async findAll(): Promise<UserModel[]> {
    return this.db.user.findMany();
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserModel> {
    const user = await this.db.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { email, password } = dto;
    const userOrNone = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (userOrNone) {
      const errors = [{ source: 'email', message: 'Email already exists' }];
      throw new HttpException(
        errorResponse(BAD_REQUEST, errors),
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // create new user
      let newUser = await this.db.user.create({
        data: {
          email,
          password,
        },
      });
      return this.buildUserRO(newUser);
    } catch (error) {
      const errors = [{ source: 'email', message: 'Email is required', error }];
      throw new HttpException(
        errorResponse(BAD_REQUEST, errors),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserModel> {
    let toUpdate = await this.db.user.findFirst({ where: { id } });
    delete toUpdate.password;
    // delete toUpdate.favorites;

    let updated = Object.assign(toUpdate, dto);
    return toUpdate;
  }

  async delete(email: string): Promise<UserModel> {
    return await this.db.user.delete({ where: { email: email } });
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      const errors = { User: [' not found'] };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.db.user.findFirst({ where: { email } });
    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: UserModel) {
    const userRO = {
      id: user.id,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      token: this.generateJWT(user),
    };
    return { user: userRO };
  }
}
