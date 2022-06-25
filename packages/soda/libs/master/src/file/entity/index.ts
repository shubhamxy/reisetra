import { File as FileModel, FileType, Prisma } from '@prisma/client'

export class File implements FileModel {
  constructor(partial: Partial<FileModel>) {
    Object.assign(this, partial)
  }

  id: string
  url: string
  fileType: FileType
  active: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  productId: string
  reviewId: string
  categoryId: string
  storyId: string
  tagId: string
  orderId: string
  meta: Prisma.JsonValue
}

export { FileType }
