import { HttpException, HttpStatus } from '@nestjs/common';
import { statusCodeText } from 'src/utils/statusCodeText';
import { ErrorCode, ErrorType, errorTypes } from '../codes/error';

export interface IError {
  code?: number | string;
  type?: string;
  source?: string;
  message?: string;
}

interface IErrorResponse<T> {
  statusCode?: number;
  message?: string;
  errors?: T[];
  meta?: Record<string, string>;
}
export type ErrorResponse<D = IError> = IErrorResponse<D>;

export function errorResponse(
  errors?: IError[] | IError,
  message?: string,
  meta?: Record<string, string>,
): ErrorResponse<IError> {
  if (errors && !Array.isArray(errors)) {
    errors = [errors];
  }
  return {
    errors: errors as IError[],
    message: message,
    meta,
  };
}

export class Exception extends HttpException {
  constructor(
    errors: IError[] | IError,
    status: HttpStatus,
    description?: string,
  ) {
    super(
      errorResponse(
        errors,
        description || statusCodeText[status] || 'Internal Exception',
      ),
      status,
    );
  }
}

export function CustomError(message: string, code: ErrorCode, type?: ErrorType, source?: string) {
  this.message = message;
  this.code = code;
  this.type = type || errorTypes[code] || undefined;
  this.source = source;
}
