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
import { File } from "src/files/entity";
import { CreateInventoryDto } from "src/inventory/dto";
import { Category, Product, Tag } from "../entity";

type Excluded =
  | "id"
  | "active"
  | "createdAt"
  | "updatedAt"
  | "extra"
  | "inventoryId";

export enum ProductSort {
  new = "new",
  bestSelling = "bestselling",
  trending = "trending",
  relevant = "relevant",
}

export class GetAllProductsDto extends CursorPaginationDTO {
  sort: ProductSort;
  tags: string[]
  category: string
  price: string[]
}

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

  @IsArray({ message: mustBeOfType("string[]", "color") })
  colors: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("string[]", "size") })
  sizes: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "dimensions") })
  dimensions: number[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "details") })
  details: Prisma.JsonValue;

  @IsDefined()
  @IsNotEmptyObject({}, { message: mustBeOfType("object", "inventory") })
  @ValidateNested({ each: true, message: mustBeOfType("object", "inventory") })
  @Type(() => CreateInventoryDto)
  inventory?: CreateInventoryDto;

  images: Omit<File, "userId">[];

  categories: string[];
  tags: string[]
  rating: number;
}

export class UpdateProductDto implements Omit<Product, Excluded> {
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

  @IsArray({ message: mustBeOfType("string[]", "color") })
  colors: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("string[]", "size") })
  sizes: string[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "dimensions") })
  dimensions: number[];

  @IsOptional()
  @IsArray({ message: mustBeOfType("array", "details") })
  details: Prisma.JsonValue;

  @IsDefined()
  @IsNotEmptyObject({}, { message: mustBeOfType("object", "inventory") })
  @ValidateNested({ each: true, message: mustBeOfType("object", "inventory") })
  @Type(() => CreateInventoryDto)
  inventory?: CreateInventoryDto;

  images: Omit<File, "userId">[];

  categories: string[];
  tags: string[];
  rating: number;
}


export class CreateCategoryDto {
  data: Omit<Category, Excluded>[]
}

export class CreateTagDto {
  data: Omit<Tag, Excluded>[]
}

export class UpdateTagDto {
  data: Omit<Tag, Excluded>[]
}
