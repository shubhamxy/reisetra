import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { CursorPaginationDTO, mustBeOfType } from '@app/core'
import { Inventory } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt'

export class GetAllInventoryDTO extends CursorPaginationDTO {}

export class CreateInventoryDTO implements Omit<Inventory, Excluded> {
  @IsNotEmpty()
  @IsNumber({}, { message: mustBeOfType('number', 'stockQuantity') })
  stockQuantity: number

  @IsNotEmpty()
  @IsString({ message: mustBeOfType('string', 'sku') })
  sku: string
}

export class UpdateInventoryDTO implements Omit<Inventory, Excluded> {
  @IsNumber({}, { message: mustBeOfType('number', 'stockQuantity') })
  stockQuantity: number

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'sku') })
  sku: string
}
