import { Prisma } from '.prisma/client'
import { CursorPaginationDTO } from 'src/common/dto'
import { Story } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId'

export class GetAllStoriesDto extends CursorPaginationDTO {}
export class GetStoriesDto extends CursorPaginationDTO {}

export class CreateStoryDto implements Omit<Story, Excluded> {
    slug: string
    subtitle: string
    styles: string[]
    title: string
    description: string | null
    body: Prisma.JsonValue
    published: boolean
    userId: string | null
    tags: string[]
}

export class UpdateStoryDto implements Omit<Story, Excluded> {
    slug: string
    subtitle: string
    styles: string[]
    title: string
    description: string | null
    body: Prisma.JsonValue
    published: boolean
    userId: string | null
    tags: string[]
}
