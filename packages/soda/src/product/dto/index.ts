import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'

import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { CursorPaginationDTO, mustBeOfType } from '@app/core'
import { File } from '@app/master'
import { Product } from '../entity'
import { CreateInventoryDTO } from '../inventory/dto'

type Excluded =
  | 'id'
  | 'active'
  | 'createdAt'
  | 'updatedAt'
  | 'extra'
  | 'slug'
  | 'inventoryId'

export enum ProductSort {
  new = 'new',
  bestSelling = 'bestselling',
  trending = 'trending',
  relevant = 'relevant',
}

export class GetAllProductsDTO extends CursorPaginationDTO {
  sort?: ProductSort
  tags?: string[]
  brands?: string[]
  category?: string
  price?: string[]
  q?: string
  rating?: number | string
}

export class CreateProductDTO implements Omit<Product, Excluded> {
  @IsString({ message: mustBeOfType('string', 'slug') })
  slug: string

  @IsString({ message: mustBeOfType('string', 'title') })
  title: string

  @IsString({ message: mustBeOfType('string', 'description') })
  description: string

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'brand') })
  brand: string

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'taxCode') })
  taxCode: string

  @IsBoolean({ message: mustBeOfType('boolean', 'published') })
  published: boolean

  @IsNumber({}, { message: mustBeOfType('number', 'price') })
  price: number

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'mrp') })
  mrp: number

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'tax') })
  tax: number

  @IsArray({ message: mustBeOfType('string[]', 'color') })
  colors: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('string[]', 'size') })
  sizes: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'dimensions') })
  dimensions: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'details') })
  details: Prisma.JsonValue

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'faqs') })
  faqs: Prisma.JsonValue

  @IsDefined()
  @IsNotEmptyObject({}, { message: mustBeOfType('object', 'inventory') })
  @ValidateNested({
    each: true,
    message: mustBeOfType('object', 'inventory'),
  })
  @Type(() => CreateInventoryDTO)
  inventory?: CreateInventoryDTO

  images: Omit<File, 'userId'>[]

  categories: string[]
  tags: string[]
  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'styles') })
  styles: string[]

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'rating') })
  rating: number

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'ratingsCount') })
  ratingsCount: number
}

export class UpdateProductDTO implements Omit<Product, Excluded> {
  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'string') })
  title: string

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'description') })
  description: string

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'brand') })
  brand: string

  @IsOptional()
  @IsString({ message: mustBeOfType('string', 'taxCode') })
  taxCode: string

  @IsOptional()
  @IsBoolean({ message: mustBeOfType('boolean', 'published') })
  published: boolean

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'price') })
  price: number

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'mrp') })
  mrp: number

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'tax') })
  tax: number

  @IsOptional()
  @IsArray({ message: mustBeOfType('string[]', 'color') })
  colors: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('string[]', 'size') })
  sizes: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'dimensions') })
  dimensions: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'details') })
  details: Prisma.JsonValue

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'faqs') })
  faqs: Prisma.JsonValue

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject({}, { message: mustBeOfType('object', 'inventory') })
  @ValidateNested({
    each: true,
    message: mustBeOfType('object', 'inventory'),
  })
  @Type(() => CreateInventoryDTO)
  inventory?: CreateInventoryDTO

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'styles') })
  styles: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'images') })
  images: Omit<File, 'userId'>[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'categories') })
  categories: string[]

  @IsOptional()
  @IsArray({ message: mustBeOfType('array', 'tags') })
  tags: string[]

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType('number', 'rating') })
  rating: number

  ratingsCount: number
}
