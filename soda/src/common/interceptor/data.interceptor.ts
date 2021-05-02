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
  message?: string;
  data: T;
}

@Injectable()
export class DataTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(map(transformData(context)),
    );
  }
}

function transformData(context: ExecutionContext): (value: any, index: number) => { message: any; data: any; statusCode: number; } {
  return (data) => {
    data['statusCode'] = context.switchToHttp().getResponse().statusCode;
    return data;
  };
}

