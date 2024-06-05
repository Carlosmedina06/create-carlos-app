import { NextFunction, Request, Response } from 'express'

import logger from '../utils/helpers/logger'

import { error } from './response'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errors = (err: any, req: Request, res: Response, _next?: NextFunction) => {
  const message = err.message || 'Error interno'
  const status = err.statusCode || 500

  logger.error(`Error codigo ${status}, ${message}`)

  return error(req, res, message, status)
}

export default errors
