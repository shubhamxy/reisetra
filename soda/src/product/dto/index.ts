import { Prisma } from ".prisma/client";
import { Type } from "class-transformer";

import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CursorPaginationDTO } from "src/common/dto";
import { CursorPaginationOptionsInterface } from "src/common/pagination";
import { isRequired, mustBeOfType } from "src/constants";
import { CreateInventoryDto } from "src/inventory/dto";
import { Product } from "../entity";

type Excluded =
  | "id"
  | "active"
  | "createdAt"
  | "updatedAt"
  | "extra"
  | "inventoryId";

export class GetAllProductsDto extends CursorPaginationDTO {}

export class CreateProductDto implements Omit<Product, Excluded> {
  @IsString({ message: mustBeOfType("string", "string") })
  title: string;
  @IsString({ message: mustBeOfType("string", "description") })
  description: string;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "brand") })
  brand: string;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "taxCode") })
  taxCode: string;

  @IsBoolean({ message: mustBeOfType("boolean", "published") })
  published: boolean;

  @IsNumber({}, { message: mustBeOfType("number", "price") })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType("number", "mrp") })
  mrp: number;

  @IsOptional()
  @IsNumber({}, { message: mustBeOfType("number", "tax") })
  tax: number;

  @IsArray({ message: mustBeOfType("array", "color") })
  color: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "size") })
  size: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "dimentions") })
  dimensions: number[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "details") })
  details: Prisma.JsonValue;

  @IsDefined()
  @IsNotEmptyObject({}, { message: mustBeOfType("object", "inventory") })
  @ValidateNested({ each: true, message: mustBeOfType("object", "inventory") })
  @Type(() => CreateInventoryDto)
  inventory?: CreateInventoryDto;

  images: {
    key: string,
    url: string,
    contentType: string,
  }[]
}

export class UpdateProductDto implements Omit<Product, Excluded> {
  @IsString({ message: mustBeOfType("string", "string") })
  title: string;
  @IsString({ message: mustBeOfType("string", "description") })
  description: string;

  @IsBoolean({ message: mustBeOfType("boolean", "published") })
  published: boolean;
  @IsNumber({}, { message: mustBeOfType("number", "price") })
  price: number;

  @IsNumber({}, { message: mustBeOfType("number", "mrp") })
  mrp: number;

  @IsNumber({}, { message: mustBeOfType("number", "tax") })
  tax: number;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "taxCode") })
  taxCode: string;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "inventoryId") })
  inventoryId: string;
  @IsOptional()
  @IsString({ message: mustBeOfType("string", "size") })
  brand: string;
  @IsOptional()

  @IsArray({ message: mustBeOfType("string", "color") })
  color: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "size") })
  size: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "dimentions") })
  dimensions: number[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "extra") })
  details: Prisma.JsonValue;
}
