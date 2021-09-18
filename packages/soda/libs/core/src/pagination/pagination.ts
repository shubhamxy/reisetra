import { PaginationType } from '@app/utils'

export interface OffsetPaginationOptionsInterface {
  limit: number
  page: number
}

export interface OffsetPaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[]
  page?: number
  size?: number

  totalCount?: number
  pageCount?: number
  next?: string
  previous?: string

  offset?: number
  link?: {
    first: string
    last: string
    self: string
    previous: string
    next: string
  }
}

export interface CursorPaginationOptionsInterface {
  size: number
  buttonNum: number
  cursor: string
  orderBy: string
  orderDirection: 'desc' | 'asc'
}

export class CursorPagination
  implements Partial<CursorPaginationOptionsInterface> {
  size?: number
  buttonNum?: number
  cursor?: string
  orderBy?: string
  orderDirection?: 'desc' | 'asc'
}

export interface CursorPaginationResultInterface<PaginationEntity>
  extends PaginationType {
  results: PaginationEntity[]
}
