import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { getErrorMessage, stackObj } from 'src/utils';
import { statusText } from 'src/utils/statusText';
import { ErrorCode, ErrorType, errorTypes } from '../codes/error';
type Data = Record<string, any> | string | number | boolean | Object;

export interface IMeta {
  context: string;
  link: any;
  totalCount: number;
  page: number;
  [key: string]: any;
}
export interface IError {
  code?: number | string;
  type?: string;
  context: string;
  message?: string;
  stack?: any;
  [key: string]: any;
}

export interface IErrorResponse<T> {
  success?: false;
  message?: string;
  errors?: T[];
  meta?: Partial<IMeta>;
}

export type ErrorResponse<D = IError> = IErrorResponse<D>;

export function errorResponse(
  errors?: IError[] | IError,
  message?: string,
  meta?: Partial<IMeta>,
): ErrorResponse<IError> {
  if (errors && !Array.isArray(errors)) {
    errors = [errors];
  }
  return {
    errors: errors as IError[],
    message,
    meta,
  };
}

export class Exception extends HttpException {
  constructor(
    errors: IError[] | IError,
    status: HttpStatus,
    description?: string,
  ) {
    super(errorResponse(errors, description), status);
  }
}

export class CustomException extends HttpException {
  constructor(
    error: IError,
    status: HttpStatus,
    context?: string,
    description?: string,
  ) {
    const message = getErrorMessage(error);
    super(
      errorResponse(
        [
          {
            message: getErrorMessage(error),
            code: error.code,
            context: context,
            type: errorTypes[error.code],
            stack: stackObj(error.message),
            data: error?.data || undefined
          },
        ],
        description || message,
      ),
      status,
    );
  }
}

export function CustomError(
  message: string,
  code: ErrorCode,
  context?: string,
  type?: ErrorType,
  data?: any
) {
  this.message = message;
  this.code = code;
  this.type = type || errorTypes[code] || undefined;
  this.context = context;
  this.data = data;
}

export type DataT =
  | Record<string, Data>[]
  | Record<string, Data>
  | Data[]
  | Data;
interface ISuccessResponse<D> {
  success?: boolean;
  message?: string;
  data?: D;
  meta?: Partial<IMeta>;
  [key: string]: DataT;
}

export type SuccessResponse<D = DataT> = ISuccessResponse<D>;

export class SuccessResponseDTO<T = DataT> implements SuccessResponse<T> {
  [key: string]: DataT;
  @ApiProperty()
  success?: boolean;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data?: T;
  @ApiProperty()
  meta?: Partial<IMeta>;
}
