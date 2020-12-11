export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;

  constructor(result: T, pagination: Pagination) {
    this.result = result;
    this.pagination = pagination;
  }
}

export interface IQueryParams {
  pageNumber: string;
  pageSize: string;
}

export class QueryParams implements IQueryParams {
  pageNumber: string;
  pageSize: string;

  constructor(pageNumber: string, pageSize: string) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }

}
