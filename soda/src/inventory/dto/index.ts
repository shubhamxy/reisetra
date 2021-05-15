import { Prisma } from '.prisma/client';

import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { isRequired, mustBeOfType } from 'src/constants';
import { Inventory } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt';

export class GetAllInventoryDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;
  cursor: string;
  orderBy: string;
  orderDirection: 'desc' | 'asc';
}

export class CreateInventoryDto implements Omit<Inventory, Excluded> {
  @IsNotEmpty()
  @IsNumber({}, {message: mustBeOfType('number', 'stockQuantity')})
  stockQuantity: number;
  @IsNotEmpty()
  @IsString({message: mustBeOfType('string', 'sku')})
  sku: string;
}


export class UpdateInventoryDto implements Omit<Inventory, Excluded> {
  @IsNumber({}, {message: mustBeOfType('number', 'stockQuantity')})
  stockQuantity: number;
  @IsOptional()
  @IsString({message: mustBeOfType('string', 'sku')})
  sku: string;
}
