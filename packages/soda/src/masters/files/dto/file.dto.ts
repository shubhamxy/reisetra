import { File, FileType } from '../entity'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { CursorPaginationDTO } from 'src/core/dto'
import { UploadUrlParams } from 'src/utils'
import { mustBe, mustBeValidEnum } from '../../../core/constants/validation'
import { Prisma } from '@prisma/client'

enum ContentTypeEnum {
    jpeg = 'image/jpeg',
    jpg = 'image/jpg',
    png = 'image/png',
    svg = 'image/svg',
}

type Excluded =
    | 'id'
    | 'userId'
    | 'fileName'
    | 'active'
    | 'createdAt'
    | 'updatedAt'
    | 'extra'
    | 'slug'
    | 'inventoryId'

export class FilesDTO extends CursorPaginationDTO {
    @IsOptional()
    @IsEnum(FileType, {
        message: mustBeValidEnum(FileType, 'fileType'),
    })
    fileType: FileType

    @IsOptional()
    @IsString({ message: mustBe('string', 'url') })
    url: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'productId') })
    productId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'reviewId') })
    reviewId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'categoryId') })
    categoryId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'userId') })
    userId: string

    active: boolean
}

export class FileUploadDTO implements Omit<UploadUrlParams, Excluded> {
    @IsEnum(FileType, {
        message: mustBeValidEnum(FileType, 'fileType'),
    })
    fileType: FileType

    @IsString({ message: mustBe('string', 'fileName') })
    fileName: string

    contentType: ContentTypeEnum
}

export class FileDTO implements Omit<File, Excluded> {
    @IsString({ message: mustBe('string', 'id') })
    id: string

    @IsString({ message: mustBe('string', 'url') })
    url: string

    @IsOptional()
    @IsEnum(FileType, {
        message: mustBeValidEnum(FileType, 'fileType'),
    })
    fileType: FileType

    @IsOptional()
    @IsString({ message: mustBe('string', 'productId') })
    productId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'reviewId') })
    reviewId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'categoryId') })
    categoryId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'storyId') })
    storyId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'tagId') })
    tagId: string

    @IsOptional()
    @IsString({ message: mustBe('string', 'orderId') })
    orderId: string

    @IsOptional()
    meta: Prisma.JsonValue

    active: boolean
}
