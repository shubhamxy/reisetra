import { File as FileModel, FileType } from ".prisma/client";

export class File implements FileModel {
  constructor(partial: Partial<FileModel>) {
    Object.assign(this, partial);
  }
  fileName: string;
  fileType: FileType;
  userId: string;

  productId: string;
  reviewId: string;
  url: string;
  contentType: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { FileType };
