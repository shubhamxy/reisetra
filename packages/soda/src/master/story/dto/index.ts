import { Prisma } from '.prisma/client'
import { CursorPaginationDTO } from '@app/core'
import { Story } from '../entity'

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId'

export class GetAllStoriesDTO extends CursorPaginationDTO {}

export class GetStoriesDTO extends CursorPaginationDTO {}

export class CreateStoryDTO implements Omit<Story, Excluded> {
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

export class UpdateStoryDTO implements Omit<Story, Excluded> {
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
