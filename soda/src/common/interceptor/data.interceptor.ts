import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { statusCodeText } from 'src/utils/statusCodeText';
import { SuccessResponse } from '../response';

export class DataTransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse> {
    return next.handle().pipe(map(transformData(context)));
  }
}

function transformData(context: ExecutionContext) {
  return (response: SuccessResponse) => {
    response['statusCode'] = response['statusCode'] || context.switchToHttp().getResponse()?.statusCode || 200;
    response['message'] = response['message'] || statusCodeText[response['statusCode']] || 'OK'
    return response;
  };
}
