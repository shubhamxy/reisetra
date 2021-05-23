import { IsEnum, IsString } from "class-validator";
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

export class UploadFileDTO implements Omit<UploadUrlProps, "userId"> {
  @IsEnum(["images", "documents"], {
    message: mustBeValidEnum(["images", "documents"], "fileType"),
  })
  fileType: "images" | "documents";
  @IsString({ message: mustBe("string", "fileName") })
  fileName: string;
  @IsEnum(ContentTypeEnum, { message: mustBeValidEnum(ContentTypeEnum, "fileType") })
  contentType: ContentTypeEnum;
}
