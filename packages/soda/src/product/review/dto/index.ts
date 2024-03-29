import { IsString } from 'class-validator'
import { CursorPaginationDTO, mustBeOfType } from '@app/core'
import { File } from '@app/master'
import { Review } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'userId' | 'updatedAt' | 'extra'

export enum ProductSort {
  new = 'new',
  bestSelling = 'bestselling',
  trending = 'trending',
  relevant = 'relevant',
}

export class GetAllReviewsDTO extends CursorPaginationDTO {}

export class CreateReviewDTO implements Omit<Review, Excluded> {
  @IsString({ message: mustBeOfType('string', 'title') })
  title: string

  @IsString({ message: mustBeOfType('string', 'description') })
  description: string

  @IsString({ message: mustBeOfType('string', 'productId') })
  productId: string

  images: Omit<File, 'userId'>[]
  tags: string[]
  rating: number
  published: boolean
}

export class UpdateReviewDTO implements Omit<Review, Excluded> {
  @IsString({ message: mustBeOfType('string', 'string') })
  title: string

  @IsString({ message: mustBeOfType('string', 'description') })
  description: string

  @IsString({ message: mustBeOfType('string', 'productId') })
  productId: string

  images: Omit<File, 'userId'>[]
  tags: string[]
  rating: number
  published: boolean
}
