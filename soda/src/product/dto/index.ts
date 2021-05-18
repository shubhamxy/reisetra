import { Prisma } from '.prisma/client';
import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CursorPaginationDTO } from 'src/common/dto';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { isRequired, mustBeOfType } from 'src/constants';
import { CreateInventoryDto } from 'src/inventory/dto';
import { Product } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'extra' | 'inventoryId';

export class GetAllProductsDto extends CursorPaginationDTO {}

export class CreateProductDto implements Omit<Product, Excluded> {
  @IsString({ message: mustBeOfType('string', 'string') })
  title: string;
  @IsString({ message: mustBeOfType('string', 'description') })
  description: string;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'size') })
  size: string;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'size') })
  brand: string;

  @IsString({ message: mustBeOfType('string', 'color') })
  color: string;
  @IsBoolean({ message: mustBeOfType('boolean', 'published') })
  published: boolean;

  @IsNumber({}, { message: mustBeOfType('number', 'price') })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'mrp') })
  mrp: number;

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'tax') })
  tax: number;

  @IsOptional()
  @IsObject({ message: mustBeOfType('object', 'extra') })
  extra?: Prisma.JsonValue;

  @IsDefined()
  @IsNotEmptyObject({}, {message: mustBeOfType('object', 'inventory')})
  @ValidateNested({ each: true, message: mustBeOfType('object', 'inventory') })
  @Type(() => CreateInventoryDto)
  inventory?: CreateInventoryDto
}

export class UpdateProductDto implements Omit<Product, Excluded> {
  @IsString({ message: mustBeOfType('string', 'string') })
  title: string;
  @IsString({ message: mustBeOfType('string', 'description') })
  description: string;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'size') })
  size: string;

  @IsString({ message: mustBeOfType('string', 'color') })
  color: string;
  @IsBoolean({ message: mustBeOfType('boolean', 'published') })
  published: boolean;
  @IsNumber({}, { message: mustBeOfType('number', 'price') })
  price: number;

  @IsNumber({}, { message: mustBeOfType('number', 'mrp') })
  mrp: number;

  @IsNumber({}, { message: mustBeOfType('number', 'tax') })
  tax: number;

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'inventoryId') })
  inventoryId: string;
  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'size') })
  brand: string;
  @IsOptional()
  @IsObject({ message: mustBeOfType('object', 'extra') })
  extra?: Prisma.JsonValue;
}