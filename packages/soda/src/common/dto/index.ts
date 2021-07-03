import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import {mustBeOfType, mustBeValidEnum } from "src/constants";
import { CursorPaginationOptionsInterface } from "../pagination";
export enum OrderDirection {
  asc = "asc",
  desc = "desc",
}
export class CursorPaginationDTO implements CursorPaginationOptionsInterface {
  @IsOptional()
  @IsNumberString()
  size: number;
  @IsOptional()
  @IsNumberString()
  buttonNum: number;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "cursor") })
  @MinLength(10)
  cursor: string;

  @IsOptional()
  @IsString({ message: mustBeOfType("string", "orderBy") })
  orderBy: string;

  @IsOptional()
  @IsEnum(OrderDirection, {
    message: mustBeValidEnum(OrderDirection, "orderDirection"),
  })
  orderDirection: OrderDirection;
}
