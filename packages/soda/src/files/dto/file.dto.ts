import { FileType, File } from '../entity'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { CursorPaginationDTO } from 'src/common/dto'
import { UploadUrlProps } from 'src/utils'
import { mustBeValidEnum, mustBe } from '../../constants/validation'
import { Prisma } from '@prisma/client'

enum ContentTypeEnum {
    jpeg = 'image/jpeg',
    jpg = 'image/jpg',
    png = 'image/png',
    svg = 'image/svg',
}

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

export class FileUploadDTO implements Omit<UploadUrlProps, 'userId'> {
    @IsEnum(FileType, {
        message: mustBeValidEnum(FileType, 'fileType'),
    })
    fileType: FileType

    @IsString({ message: mustBe('string', 'fileName') })
    fileName: string

    contentType: ContentTypeEnum
}

export class FileDTO
    implements Omit<File, 'userId' | 'fileName' | 'createdAt' | 'updatedAt'> {
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
