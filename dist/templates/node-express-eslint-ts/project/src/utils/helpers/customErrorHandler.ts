interface CustomError extends Error {
  statusCode?: number
}

function createCustomError(message: string, code?: number): CustomError {
  const error: CustomError = new Error(message)

  if (code !== undefined) {
    error.statusCode = code
  }

  return error
}

export default createCustomError
