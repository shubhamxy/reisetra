import { IsString } from "class-validator";
import { CursorPaginationDTO } from "src/common/dto";
import { mustBeOfType } from "src/constants";
import { File } from "src/files/entity";
import { Review } from "../entity";

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

export class GetAllReviewsDto extends CursorPaginationDTO {}

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
    published: boolean;
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
    published: boolean;
}
