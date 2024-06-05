const isQueryTrue = (value: unknown): boolean => {
  return typeof value === 'string' && value.toLowerCase() === 'true'
}

export default isQueryTrue
