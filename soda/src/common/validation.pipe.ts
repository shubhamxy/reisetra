import { plainToClass } from 'class-transformer';
import {PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { BAD_REQUEST, isRequired } from 'src/constants';
import { errorResponse, IError } from './errorResponse';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    console.log({
      value,
      metadata,
    })
    if (!value) {
      throw new BadRequestException(isRequired('Data'));
    }
    const { metatype } = metadata;
    console.log(metatype)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorResult: IError[] = [];
      errors.forEach(error => {
        errorResult.push({
          code: 0,
          message: error.constraints[0],
          source: error.property,
        })
      })
      throw new HttpException(errorResponse(BAD_REQUEST, errorResult), HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
