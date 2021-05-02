import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserRO } from 'src/user/interfaces/user.interface';
import { User as UserModel } from '.prisma/client';
import { UnauthorizedException } from 'src/common/response/exeptions';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Partial<UserModel>> {
    const userOrNull = await this.authService.validateUser(email, password);
    if (!userOrNull) {
      throw UnauthorizedException();
    }
    return userOrNull.user;
  }
}
