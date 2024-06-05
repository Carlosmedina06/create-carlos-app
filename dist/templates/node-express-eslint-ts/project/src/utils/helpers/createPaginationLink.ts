import { Request } from 'express'

import { AdditionalQuery, PaginationLinks } from '../../interfaces/ipagination'

// Function to create pagination links
function createPaginationLinks(
  req: Request,
  pageNumber: number,
  pageSize: number | string,
  totalPages: number,
  baseUrl: string,
  additionalQuery: AdditionalQuery = {},
): PaginationLinks {
  // Get the host from the request
  const host = `https://${req.headers.host}`
  let nextPage: string | null = null
  let prevPage: string | null = null

  // Base next and previous page URLs
  const baseNextPageUrl = `${host}${baseUrl}?pageSize=${pageSize}`
  const basePrevPageUrl = `${host}${baseUrl}?pageSize=${pageSize}`

  // Check if there is a next or previous page
  if (pageNumber < totalPages) {
    let nextPageUrl = `${baseNextPageUrl}&page=${pageNumber + 1}`

    // Add additional query parameters to the next page URL
    for (const [key, value] of Object.entries(additionalQuery)) {
      if (!key || value === null || value === undefined) continue

      nextPageUrl += `&${key}=${value}`
    }

    nextPage = nextPageUrl
  }

  // Check if there is a previous page
  if (pageNumber > 1) {
    let prevPageUrl = `${basePrevPageUrl}&page=${pageNumber - 1}`

    // Add additional query parameters to the previous page URL
    for (const [key, value] of Object.entries(additionalQuery)) {
      if (!key || value === null || value === undefined) continue

      prevPageUrl += `&${key}=${value}`
    }

    prevPage = prevPageUrl
  }

  // Return the next and previous page URLs
  return {
    nextPage,
    prevPage,
  }
}

export default createPaginationLinks
