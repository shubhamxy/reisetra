/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SuccessResponse } from '../response'

export class DataTransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SuccessResponse> {
    return next.handle().pipe(map(transformData(context)))
  }
}

function transformData(context: ExecutionContext) {
  return (response: SuccessResponse) => {
    response.success = true
    return response
  }
}
