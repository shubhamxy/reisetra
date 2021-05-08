import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  AWS_SES_DEFAULT_EMAIL_SENDER,
  JWT_ACCESS_TOKEN_OPTIONS,
  JWT_REFRESH_TOKEN_OPTIONS,
} from 'src/config';
import { getEmailVerificationTokenKey, getForgotPasswordKey, getRefreshTokenKey } from 'src/utils/redis';
import { RedisService } from 'src/redis/redis.service';
import { CreateUserDto } from 'src/user/dto';
import { User } from '.prisma/client';
import { UserRO } from 'src/user/interfaces/user.interface';
import { Exception, SuccessResponse } from 'src/common/response';
import { nanoid } from 'nanoid';
import { GoogleUser } from './strategy/google.strategy';
import { createParams, sendEmail } from 'src/utils/aws';
import { passwordResetEmail, emailVerificationEmail } from 'src/utils/template';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/login.dto';
export interface AuthTokenPayload {
  id: string;
  sub: string;
  email: string;
  role: string;
}

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

  async setRefreshToken(userId: string, tokenId: string) {
    return this.cache.set(getRefreshTokenKey(userId), tokenId);
  }

  async getRefreshToken(userId: string) {
    return this.cache.get(getRefreshTokenKey(userId));
  }

  async removeRefreshToken(userId: string) {
    return this.cache.del(getRefreshTokenKey(userId));
  }

  async verifyRefreshToken(
    payload: AuthTokenPayload,
  ): Promise<AuthTokenPayload> {
    const tokenId = await this.getRefreshToken(payload.sub);
    return tokenId && tokenId === payload.id ? payload : null;
  }

  async getAuthToken({ id, email, role }: Partial<AuthTokenPayload>) {
    if (!id || !email || !role) {
      throw new Exception({ message: 'Invalid Token' }, HttpStatus.BAD_REQUEST);
    }
    const tokenId = nanoid(6);
    const jwtPayload = { email, sub: id, role: role, id: tokenId };
    const accessToken = this.jwt.sign(jwtPayload, JWT_ACCESS_TOKEN_OPTIONS);
    const refreshToken = this.jwt.sign(jwtPayload, JWT_REFRESH_TOKEN_OPTIONS);
    this.setRefreshToken(id, tokenId);
    return {
      id,
      email,
      role,
      expires_in: JWT_ACCESS_TOKEN_OPTIONS.expiresIn,
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
    if(createdUser) {
      this.sendEmailVerification(createdUser.id, createdUser.email);
    }
    return this.getAuthToken(createdUser);
  }

  async resetPassword(data: ResetPasswordDto) {
    const updatedUser = await this.user.resetPassword(data.email, data.password);
    this.cache.del(getForgotPasswordKey(data.email));
    return this.getAuthToken(updatedUser);
  }

  async updatePassword(email: string, data: UpdatePasswordDto) {
    const updatedUser = await this.user.updatePassword(email, data.password, data.oldPassword);
    return this.getAuthToken(updatedUser);
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
  async createEmailToken(id: string): Promise<any> {
    const token = nanoid(6);
    this.cache.set(getEmailVerificationTokenKey(id), token);
    return token;
  }
  async verifyEmail(id: string, token: string): Promise<any> {
    const storedToken = await this.cache.get(getEmailVerificationTokenKey(id));
    if(!storedToken){
      return false;
    }
    if(storedToken === token) {
      await this.user.findAndUpdate(id, {emailVerified: true});
      await this.cache.del(getEmailVerificationTokenKey(id));
      return true;
    }
    return false;
  }
  async createForgottenPasswordToken(email: string): Promise<any> {
    const forgotPasswordToken = nanoid(16);
    // @TODO add time??
    await this.cache.set(getForgotPasswordKey(email), forgotPasswordToken);
    return forgotPasswordToken;
  }
  async sendEmailVerification(id: string, email: string): Promise<any> {
    const emailToken = await this.createEmailToken(id);
    try {
      const data = await sendEmail(emailVerificationEmail({
        email,
        token: emailToken,
        id: id,
      }));
      return data;
    } catch (err) {
      throw new Exception({ message: 'Invalid Token' }, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyForgotPasswordToken(email: string, token: string): Promise<any> {
    const storedToken = await this.cache.get(getForgotPasswordKey(email)) as string;
    if(!storedToken){
      return false;
    }
    if(storedToken === token) {
      return true;
    }
    return false;
  }

  async sendForgotPasswordEmail(email: string): Promise<any> {
    try {
    const forgotPasswordToken = await this.createForgottenPasswordToken(email);
      const data = await sendEmail(passwordResetEmail({
        email,
        token: forgotPasswordToken,
      }));
      return data;
    } catch (err) {
      throw new Exception({ message: 'Invalid Token' }, HttpStatus.BAD_REQUEST);
    }
  }
}
