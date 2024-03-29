import { HttpException, HttpStatus } from '@nestjs/common'
import { PageCursorsType } from '@app/utils'
import { ErrorCode, ErrorType, ErrorTypes } from '../codes/error'

type Data =
  | Record<string, any>
  | string
  | number
  | boolean
  | Record<string, unknown>

export interface IMeta {
  context: string
  link: PageCursorsType
  totalCount: number
  page: number

  [key: string]: any
}

export interface IError {
  code?: number | string
  type?: string
  context: string
  message?: string
  stack?: any

  [key: string]: any
}

export interface IErrorResponse<T> {
  success?: false
  message?: string
  errors?: T[]
  meta?: Partial<IMeta>

  [key: string]: any
}

export type ErrorResponse<D = IError> = IErrorResponse<D>

export function errorResponse(
  errors?: IError[] | IError,
  message?: string,
  meta?: Partial<IMeta>
): ErrorResponse<IError> {
  if (errors && !Array.isArray(errors)) {
    errors = [errors]
  }
  return {
    errors: errors as IError[],
    message,
    meta,
  }
}

export class Exception extends HttpException {
  constructor(
    errors: IError[] | IError,
    status: HttpStatus,
    description?: string
  ) {
    super(errorResponse(errors, description), status)
  }
}

export function AppError(
  message: string,
  code: ErrorCode,
  context?: string,
  status?: HttpStatus,
  type?: ErrorType,
  data?: any
) {
  this.message = message
  this.code = code
  this.type = type || ErrorTypes[code] || undefined
  this.context = context
  this.status = status
  this.data = data
}

export function DBError(error, context) {
  this.message = error?.meta?.cause || error.message
  this.code = error.code
  this.context = context
  this.data = error.data
}

export type DataT =
  | Record<string, Data>[]
  | Record<string, Data>
  | Data[]
  | Data

interface ISuccessResponse<D> {
  success?: boolean
  message?: string
  data?: D
  meta?: Partial<IMeta>

  [key: string]: DataT
}

export type SuccessResponse<D = DataT> = ISuccessResponse<D>

export class SuccessResponseDTO<T = DataT> implements SuccessResponse<T> {
  [key: string]: DataT

  success?: boolean
  message?: string
  data?: T
  meta?: Partial<IMeta>
}
