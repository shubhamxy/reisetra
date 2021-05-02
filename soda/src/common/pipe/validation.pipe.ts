import { plainToClass } from 'class-transformer';
import {PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { BAD_REQUEST, isRequired } from 'src/constants';
import { errorResponse, IError } from '../response/error';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
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
      throw new HttpException(errorResponse(BAD_REQUEST, errorResult.reverse()), HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
