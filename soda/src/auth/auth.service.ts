import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_OPTIONS,
  JWT_REFRESH_TOKEN_OPTIONS,
} from 'src/config';
import { getRefreshTokenKey } from 'src/utils/redis';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto } from 'src/user/dto';
import { User } from '.prisma/client';
import { UserRO } from 'src/user/interfaces/user.interface';
import { Exception, SuccessResponse } from 'src/common/response';
import { nanoid } from 'nanoid';
import { GoogleUser } from './strategy/google.strategy';
@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: JwtService,
    private cache: RedisService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserRO> {
    return this.user.findAndVerify({ email, password });
  }

  async setCurrentRefreshToken(tokenId: string, userId: string) {
    return this.cache.set(getRefreshTokenKey(userId), tokenId);
  }

  async getCurrentRefreshToken(userId: string) {
    return this.cache.get(getRefreshTokenKey(userId));
  }

  async removeCurrentRefreshToken(userId: string) {
    return this.cache.del(getRefreshTokenKey(userId));
  }

  async verifyRefreshToken(payload: {
    id: string;
    sub: string;
    email: string;
    role: string;
  }): Promise<{ sub: string; email: string; role: string }> {
    const tokenId = await this.getCurrentRefreshToken(payload.sub);
    return tokenId && tokenId === payload.id ? payload : null;
  }

  async getAuthToken({ id, email, role }: Partial<User>) {
    if (!id || !email || !role) {
      throw new Exception(
        { message: 'Invalid Refresh Token' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokenId = nanoid();
    const accessToken = this.jwt.sign(
      { email, sub: id, role: role, id: tokenId },
      JWT_ACCESS_TOKEN_OPTIONS,
    );
    const refreshToken = this.jwt.sign(
      { email, sub: id, role: role, id: tokenId },
      JWT_REFRESH_TOKEN_OPTIONS,
    );
    await this.setCurrentRefreshToken(tokenId, id);
    return {
      id,
      email,
      role,
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
    };
  }

  async login(user: Partial<User>) {
    return this.getAuthToken(user);
  }

  async signup(user: CreateUserDto) {
    const createdUser = await this.user.create(user);
    return this.getAuthToken(createdUser);
  }

  async googleLogin(user: GoogleUser) {
    const userOrNull = await this.user.findAndUpdateOauthAccount({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      oauthId: user.oauthId,
      oauthProvider: 'GOOGLE',
      role: 'USER',
    });
    if (userOrNull) {
      return this.getAuthToken(userOrNull);
    }
    /** User does not exist on db sign them up **/
    const newUser = await this.user.createOauthAccount({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      oauthId: user.oauthId,
      oauthProvider: 'GOOGLE',
      role: 'USER',
    });
    return this.getAuthToken(newUser);
  }
}
