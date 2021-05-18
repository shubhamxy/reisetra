import { plainToClass } from 'class-transformer';
import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  ValidationPipe as _ValidationPipe,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { Exception, IError } from '../response';
export class ValidationPipe extends _ValidationPipe {
  constructor() {
    super({
      stopAtFirstError: true,
      // forbidNonWhitelisted: true,
      // always: true,
      // forbidUnknownValues: true,
      // whitelist: true,
      exceptionFactory: (errors) => {
        const errorList = getValidationErrors(errors);
        if (errorList.length > 0) {
          throw new Exception(errorList, HttpStatus.BAD_REQUEST);
        }
      },
    });
  }
}

function getValidationErrors(errors: ValidationError[], depth = 3) {
  const errorList: IError[] = [];
  if (depth < 0) {
    return;
  }
  if (errors.length > 0) {
    errors.forEach((error) => {
      if (error.constraints) {
        Object.entries(error.constraints).forEach(([errorKey, constraint]) => {
          errorList.push({
            type: errorKey,
            message: constraint,
            context: error.property,
          });
        });
      }

      if (error.children && error.children.length > 0) {
        const childList = getValidationErrors(error.children, depth - 1);
        errorList.push(...childList);
      }
    });
  }
  return errorList;
}
