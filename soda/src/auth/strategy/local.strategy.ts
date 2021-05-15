import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CustomException, CustomError } from '../../common/response';
import { errorCodes } from '../../common/codes/error';
import { User } from '../../user/entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    try {
      const userOrNull = await this.authService.validateUser(email, password);
      if (userOrNull === null) {
        throw new CustomError( 'Username and password does not match', errorCodes.LocalAuthFailed, 'LocalStrategy.validate');
      }
      return userOrNull;
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.UNAUTHORIZED,
        'LocalStrategy.validate',
      );
    }
  }
}
