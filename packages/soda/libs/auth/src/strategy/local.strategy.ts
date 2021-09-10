import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { CustomError, CustomException, errorCodes } from '@app/core'
import { AuthService } from '../auth.service'
import { User } from '@app/user'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
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
        throw new CustomError(
          'Username and password does not match',
          errorCodes.LocalAuthFailed,
          'LocalStrategy.validate'
        )
      }
      return userOrNull
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.UNAUTHORIZED,
        'LocalStrategy.validate'
      )
    }
  }
}
