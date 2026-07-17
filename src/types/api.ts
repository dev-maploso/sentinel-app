export interface PaginationMeta {
  current_page: number;
  last_page: number;
  has_more: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}