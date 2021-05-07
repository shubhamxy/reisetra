export interface OffsetPaginationOptionsInterface {
  limit: number;
  page: number;
}

export interface OffsetPaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  page?: number;
  per_page?: number;
  total_count?: number;
  page_count?: number;
  next?: string;
  previous?: string;

  limit?: number;
  offset?: number;

  link?: {
    self: string;
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface CursorPaginationOptionsInterface {
  limit: number;
  page: number;
}

export interface CursorPaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  page?: number;
  per_page?: number;
  total_count?: number;
  page_count?: number;
  next?: string;
  previous?: string;

  limit?: number;
  offset?: number;

  link?: {
    self: string;
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
