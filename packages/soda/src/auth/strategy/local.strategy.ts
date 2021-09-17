import { HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { errorCodes } from '../../core/codes/error'
import { CustomError, CustomException } from '../../core/response'
import { User } from '../../users/entity'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
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
            const userOrNull = await this.authService.validateUser(
                email,
                password
            )
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
