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
import { Review} from "../entity";

type Excluded =
  | "id"
  | "active"
  | "createdAt"
  | "userId"
  | "updatedAt"
  | "extra"
  | "inventoryId";

export enum ProductSort {
  new = "new",
  bestSelling = "bestselling",
  trending = "trending",
  relevant = "relevant",
}

export class GetAllReviewsDto extends CursorPaginationDTO {
}

export class CreateReviewDto implements Omit<Review, Excluded> {
  @IsString({ message: mustBeOfType("string", "title") })
  title: string;
  @IsString({ message: mustBeOfType("string", "description") })
  description: string;
  @IsString({ message: mustBeOfType("string", "productId") })
  productId: string;
  images: Omit<File, "userId">[];
  tags: string[];
  rating: number;
}

export class UpdateReviewDto implements Omit<Review, Excluded> {
  @IsString({ message: mustBeOfType("string", "string") })
  title: string;
  @IsString({ message: mustBeOfType("string", "description") })
  description: string;
  @IsString({ message: mustBeOfType("string", "productId") })
  productId: string;
  images: Omit<File, "userId">[];
  tags: string[];
  rating: number;
}
