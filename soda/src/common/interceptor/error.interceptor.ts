import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_VERSION } from 'src/config';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(error => {
          const statusCode =  context.switchToHttp().getResponse().statusCode as number;
          error.response['statusCode'] = statusCode;
          return throwError(error)
        }),
      );
  }
}
