import { Request, Response, NextFunction } from 'express'

export interface Express {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any
  req: Request
  res: Response
  next: NextFunction
}
