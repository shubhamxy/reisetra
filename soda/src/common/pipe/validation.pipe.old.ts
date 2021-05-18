import { plainToClass } from 'class-transformer';
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { isRequired } from 'src/constants';
import { Exception, IError } from '../response';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private options: ValidationPipeOptions;
  constructor(options?: ValidationPipeOptions) {
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
    const errorList = getValidationErrors(errors);
    if (errorList.length > 0) {
      throw new Exception(errorList, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

function getValidationErrors(errors: ValidationError[], depth = 3) {
  const errorList: IError[] = [];
  if(depth < 0) {return};

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

      if(error.children && error.children.length > 0) {
        const childList = getValidationErrors(error.children, depth - 1);
        errorList.push(...childList);
      }
    });
  }
  return errorList;
}
