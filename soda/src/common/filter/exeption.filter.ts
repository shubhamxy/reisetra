import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IS_PRODUCTION } from 'src/config';
import { ErrorResponse } from '../response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      let exeptionResponse = exception.getResponse();
      if (typeof exeptionResponse === 'string') {
        exeptionResponse = {
          message: exeptionResponse,
        };
      }
      exeptionResponse['statusCode'] = status;
      if (!IS_PRODUCTION) {
        exeptionResponse['meta'] = exeptionResponse['meta'] || {};
        exeptionResponse['meta']['stack'] = exception.stack;
      }

      response.status(status).json(exeptionResponse);
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse: ErrorResponse = {
        errors: [],
        message: 'Internal Server Error',
        statusCode: status,
      };
      response.status(status).json(errorResponse);
    }
  }
}
