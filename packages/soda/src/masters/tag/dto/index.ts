import { CursorPaginationDTO } from 'src/core/dto'
import { File } from 'src/masters/files/entity'
import { Tag } from '../entity'

type Excluded =
    | 'id'
    | 'active'
    | 'createdAt'
    | 'updatedAt'
    | 'extra'
    | 'slug'
    | 'inventoryId'

export enum ProductSort {
    new = 'new',
    bestSelling = 'bestselling',
    trending = 'trending',
    relevant = 'relevant',
}

export class GetAllTagsDTO extends CursorPaginationDTO {}

export class CreateTagDTO implements Omit<Tag, Excluded> {
    styles: string[]
    label: string
    value: string
    description: string
    images: Omit<File, 'userId'>[]
}

export class UpdateTagDTO implements Omit<Tag, Excluded> {
    styles: string[]
    label: string
    value: string
    description: string
    images: Omit<File, 'userId'>[]
}
