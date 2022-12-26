export interface PaginationInput<T> {
  page: number;
  limit: number;
  sortProperty: T;
}

export interface PaginationOutput {
  totalPages?: number;
  totalResults?: number;
}
