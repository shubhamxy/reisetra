import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidationFailedException extends HttpException {
  constructor(key: string) {
    super(`Validation Failed: ${key}`, HttpStatus.BAD_REQUEST)
  }
}
