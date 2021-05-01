import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_VERSION } from 'src/config';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class DataTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode as number,
          message: data.message as string,
          data: data,
          meta: {
            version: API_VERSION
          }
        })),
      );
  }
}
