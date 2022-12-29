export interface PaginationInput {
  page: number;
  limit: number;
}

export interface PaginationOutput {
  totalPages?: number;
  totalResults?: number;
}
