export interface IError {
  code?: number | string
  type?: string
  source?: string
  message?: string
}

export interface ErrorResponse<T> {
  statusCode?: number;
  message?: string;
  errors?: T[];
  meta?: Record<string, string>
}

/**
 * Error Response sent to user
 * @param message top level message ex. Bad Request | Unauthorized ... etc
 * @param errors errors
 * @param statusCode status code
 * @param meta
 * @returns
 */
export function errorResponse(
  message: string,
  errors?: IError[] | IError,
  statusCode?: number,
  meta?: Record<string, string>,
): ErrorResponse<IError> {
  if(errors && !Array.isArray(errors)) {
    errors = [errors];
  }
  return {
    errors: errors as IError[],
    message: message,
    meta,
    statusCode,
  };
}
