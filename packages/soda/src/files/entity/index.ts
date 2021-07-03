import { File as FileModel, FileType } from ".prisma/client";

export class File implements FileModel {
  constructor(partial: Partial<FileModel>) {
    Object.assign(this, partial);
  }
  id: string;
  url: string;
  fileType: FileType;
  contentType: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  productId: string;
  reviewId: string;
  categoryId: string;
  tagId: string;
}

export { FileType };
