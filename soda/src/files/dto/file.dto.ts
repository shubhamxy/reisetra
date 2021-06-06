import { FileType, File } from "../entity";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { CursorPaginationDTO } from "src/common/dto";
import { UploadUrlProps } from "src/utils";
import { mustBeValidEnum, mustBe } from "../../constants/validation";
export class PublicFile {
  public id: number;
  public url: string;
  public key: string;
}

enum ContentTypeEnum {
  jpeg = "image/jpeg",
  jpg = "image/jpg",
  png = "image/png",
  svg = "image/svg",
}
export class GetAllFilesDto extends CursorPaginationDTO {}

export class UploadFileDTO implements Omit<UploadUrlProps, "userId"> {
  @IsEnum(FileType, {
    message: mustBeValidEnum(FileType, "fileType"),
  })
  fileType: FileType;
  @IsString({ message: mustBe("string", "fileName") })
  fileName: string;
  @IsEnum(ContentTypeEnum, {
    message: mustBeValidEnum(ContentTypeEnum, "fileType"),
  })
  contentType: ContentTypeEnum;
}

export class AddFileDTO implements Omit<File, "userId"> {
  @IsString({ message: mustBe("string", "fileName") })
  fileName: string;

  @IsEnum(FileType, {
    message: mustBeValidEnum(FileType, "fileType"),
  })
  fileType: FileType;

  @IsEnum(ContentTypeEnum, {
    message: mustBeValidEnum(ContentTypeEnum, "fileType"),
  })
  contentType: ContentTypeEnum;

  @IsString({ message: mustBe("string", "url") })
  url: string;

  @IsOptional()
  @IsString({ message: mustBe("string", "productId") })
  productId: string;

  @IsOptional()
  @IsString({ message: mustBe("string", "reviewId") })
  reviewId: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
