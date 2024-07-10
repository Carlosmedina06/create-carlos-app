export interface PaginationLinks {
  nextPage: string | null
  prevPage: string | null
}

export interface AdditionalQuery {
  [key: string]: string | number | boolean | object | null | undefined
}
