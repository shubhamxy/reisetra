import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_ACCESS_TOKEN_OPTIONS, JWT_REFRESH_TOKEN_OPTIONS} from 'src/config';
import { getRefreshTokenKey } from 'src/utils/redis';
import { RedisService } from 'src/redis/redis.service';
import { BAD_REQUEST } from 'src/constants';
import { CreateUserDto } from 'src/user/dto';
import { User } from '.prisma/client';
import { UserRO } from 'src/user/interfaces/user.interface';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private user: UserService, private jwt: JwtService, private cache: RedisService) {

  }

  async validateUser(email: string, password: string): Promise<UserRO> {
    return this.user.findAndVerify({ email, password });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    return this.cache.set(getRefreshTokenKey(userId), refreshToken);
  }

  async getCurrentRefreshToken(userId: string) {
    return this.cache.get(getRefreshTokenKey(userId));
  }

  async removeCurrentRefreshToken(userId: string) {
    return this.cache.del(getRefreshTokenKey(userId));
  }

  async verifyRefreshToken(payload, refreshToken): Promise<{email, sub, role}> {
    const refreshTokenStored = await this.getCurrentRefreshToken(payload.sub);
    return refreshTokenStored && refreshToken === refreshTokenStored ? payload : null;
  }

  async getAuthToken({id, email, role}: Partial<User>) {
    if (!id || !email || !role) {
      return null;
    }
    const payload = { email, sub: id, role: role };
    const accessToken = this.jwt.sign(payload, JWT_ACCESS_TOKEN_OPTIONS);
    const refreshToken = this.jwt.sign(payload, JWT_REFRESH_TOKEN_OPTIONS);
    await this.setCurrentRefreshToken(refreshToken, id);
    return {
      id,
      email,
      role,
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'bearer',
    };
  }

  async login(user) {
    return this.getAuthToken(user);
  }

  async signup(user: CreateUserDto) {
    const createdUser = await this.user.create(user);
    return this.getAuthToken(createdUser.user);
  }
}
