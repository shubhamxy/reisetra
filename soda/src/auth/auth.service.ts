import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import {
  getEmailVerificationTokenKey,
  getForgotPasswordKey,
  getRefreshTokenKey,
} from "../utils/redis";
import { RedisService } from "../common/modules/redis/redis.service";
import { CreateUserDto } from "../user/dto";
import { User } from ".prisma/client";
import { UserRO } from "../user/interfaces/user.interface";
import { nanoid } from "nanoid";
import { GoogleUser } from "./strategy/google.strategy";
import { sendEmail, IData } from "../utils/aws";
import { passwordResetEmail, emailVerificationEmail } from "../utils/template";
import { CustomError } from "../common/response";
import { errorCodes } from "../common/codes/error";
import { ConfigService } from "@nestjs/config";
import { AppEnv, AuthEnv } from "src/config";

export interface AuthTokenPayload {
  tid: string;
  sub: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  role: string;
  expires_in: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
}

@Injectable()
export class AuthService {
  appConfig: AppEnv;
  authConfig: AuthEnv;
  constructor(
    private user: UserService,
    private jwt: JwtService,
    private cache: RedisService,
    configService: ConfigService
  ) {
    this.appConfig = configService.get<AppEnv>("app");
    this.authConfig = configService.get<AuthEnv>("auth");
  }

  async validateUser(email: string, password: string): Promise<UserRO> {
    return this.user.verifyEmailPassword({ email, password });
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

  async isRefreshTokenPayloadValid(
    payload: AuthTokenPayload
  ): Promise<boolean> {
    const tokenId = await this.getRefreshToken(payload.sub);
    return tokenId && tokenId === payload.tid ? true : false;
  }

  async getAuthToken({
    id,
    email,
    role,
  }: Partial<{
    id: string;
    email: string;
    role: string;
  }>): Promise<AuthResponse> {
    if (!id || !email || !role) {
      throw new CustomError(
        "Invalid Token",
        errorCodes.AuthFailed,
        "AuthService.getAuthToken"
      );
    }
    const tid = nanoid(5);
    const jwtAccessTokenPayload = { email, sub: id, role: role, tid };
    const jwtRefreshTokenPayload = { email, sub: id, role: role, tid };
    const accessToken = this.jwt.sign(
      jwtAccessTokenPayload,
      this.authConfig.jwtAccessTokenOptions
    );

    const refreshToken = this.jwt.sign(
      jwtRefreshTokenPayload,
      this.authConfig.jwtRefreshTokenOptions
    );

    this.setRefreshToken(id, tid);
    return {
      id,
      email,
      role,
      expires_in: this.authConfig.jwtAccessTokenOptions.expiresIn,
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
    };
  }

  async login(user: Partial<User>): Promise<AuthResponse> {
    return this.getAuthToken(user);
  }

  async signup(user: CreateUserDto): Promise<AuthResponse> {
    const createdUser = await this.user.create(user);
    const authPayload = await this.getAuthToken(createdUser);
    if (createdUser) {
      if (this.appConfig.isProduction) {
        this.sendEmailVerification(createdUser.id, createdUser.email);
      }
    }
    return authPayload;
  }

  async resetPassword(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const updatedUser = await this.user.resetPassword(
      data.email,
      data.password
    );
    this.cache.del(getForgotPasswordKey(data.email));
    return this.getAuthToken(updatedUser);
  }

  async updatePassword(
    email: string,
    data: {
      password: string;
      oldPassword: string;
    }
  ): Promise<AuthResponse> {
    const updatedUser = await this.user.updatePassword(
      email,
      data.password,
      data.oldPassword
    );
    return this.getAuthToken(updatedUser);
  }

  async googleLogin(user: GoogleUser): Promise<AuthResponse> {
    const userOrNull = await this.user.findAndUpdateOauthAccount({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      oauthId: user.oauthId,
      oauthProvider: "GOOGLE",
      role: "USER",
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
      oauthProvider: "GOOGLE",
      role: "USER",
    });
    return this.getAuthToken(newUser);
  }

  async createEmailToken(id: string): Promise<string> {
    const token = nanoid(6);
    this.cache.set(getEmailVerificationTokenKey(id), token);
    return token;
  }

  async verifyEmail(id: string, token: string): Promise<boolean> {
    const storedToken = await this.cache.get(getEmailVerificationTokenKey(id));
    if (!storedToken) {
      return false;
    }
    if (storedToken === token) {
      await this.user.findAndUpdate(id, { emailVerified: true });
      await this.cache.del(getEmailVerificationTokenKey(id));
      return true;
    }
    return false;
  }

  async createForgottenPasswordToken(email: string): Promise<string> {
    const forgotPasswordToken = nanoid(16);
    // @TODO add time??
    await this.cache.set(getForgotPasswordKey(email), forgotPasswordToken);
    return forgotPasswordToken;
  }

  async sendEmailVerification(id: string, email: string): Promise<IData> {
    const emailToken = await this.createEmailToken(id);
    const data = await sendEmail(
      emailVerificationEmail({
        email,
        token: emailToken,
        id: id,
      })
    );
    return data;
  }

  async verifyForgotPasswordToken(
    email: string,
    token: string
  ): Promise<boolean> {
    const storedToken = (await this.cache.get(
      getForgotPasswordKey(email)
    )) as string;
    if (!storedToken) {
      return false;
    }
    if (storedToken === token) {
      return true;
    }
    return false;
  }

  async sendForgotPasswordEmail(email: string): Promise<IData> {
    const forgotPasswordToken = await this.createForgottenPasswordToken(email);
    if (this.appConfig.isProduction) {
      const data = await sendEmail(
        passwordResetEmail({
          email,
          token: forgotPasswordToken,
        })
      );
      return data;
    }
  }
}
