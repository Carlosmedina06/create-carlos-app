import { Request, Response, NextFunction } from 'express'

import { generateUuid } from '../utils/helpers/uuidGenerator'

const traceCapture = function (err: unknown, req: Request, res: Response, next: NextFunction) {
  let trace = req.header('x-request-id')

  if (!trace) {
    trace = generateUuid()
  }
  res.set({
    'x-request-id': `${trace}`,
  })
  req.headers['Sopapo'] = trace
  next()
}

export default traceCapture
