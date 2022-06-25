import { HttpException, HttpStatus } from '@nestjs/common'
import { getErrorMessage, stackObj } from '@app/utils'
import { errorResponse, IError } from '../response'
import { ErrorTypes } from '../codes'

export class CustomException extends HttpException {
  constructor(
    error: IError,
    status: HttpStatus,
    context?: string,
    description?: string
  ) {
    const message = getErrorMessage(error)
    super(
      errorResponse(
        [
          {
            message: getErrorMessage(error) || undefined,
            code: error.code || undefined,
            context: context || error.context || undefined,
            type: error.type || ErrorTypes[error.code] || undefined,
            stack: stackObj(error.message) || undefined,
            data: error?.data || undefined,
          },
        ],
        description || message
      ),
      status
    )
  }
}
