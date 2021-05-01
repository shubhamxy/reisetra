export interface IError {
  code?: number;
  source?: string;
  message?: string;
  meta?: Record<string, string>;
}

export interface Response<T> {
  statusCode?: number;
  message: string;
  errors: T[];
}

export function errorResponse(
  message: string,
  errors: IError[],
): Response<IError> {
  return {
    message,
    errors,
  };
}
