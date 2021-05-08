import { plainToClass } from 'class-transformer';
import {PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { BAD_REQUEST, isRequired } from 'src/constants';
import { errorResponse, Exception, IError } from '../response/error';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private options: ValidationPipeOptions;
  constructor(options?: ValidationPipeOptions){
    this.options = options || {};
  }

  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(isRequired('Data'));
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorResult: IError[] = [];
      errors.forEach(error => {
        Object.entries(error.constraints).forEach(([errorKey, constraint]) => {
          errorResult.push({
            type: errorKey,
            message: constraint,
            source: error.property,
          })
        })
      })
      throw new Exception(errorResult.reverse(), HttpStatus.BAD_REQUEST, BAD_REQUEST);
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}