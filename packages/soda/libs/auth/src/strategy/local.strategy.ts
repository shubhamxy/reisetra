import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AppError, CustomException, LocalAuthFailed } from '@app/core'
import { AuthService } from '../auth.service'
import { User } from '@app/user'
import {
  EMAIL,
  EMAIL_PASSWORD_DOES_NOT_MATCH,
  PASSWORD,
} from '@app/auth/auth.const'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      usernameField: EMAIL,
      passwordField: PASSWORD,
      passReqToCallback: true,
    })
  }

  async validate(
    request: Request,
    email: string,
    password: string
  ): Promise<Partial<User>> {
    try {
      const userOrNull = await this.auth.validateUser(email, password)
      if (userOrNull === null) {
        throw new AppError(EMAIL_PASSWORD_DOES_NOT_MATCH, LocalAuthFailed)
      }
      return userOrNull
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.UNAUTHORIZED,
        LocalStrategy.name
      )
    }
  }
}
