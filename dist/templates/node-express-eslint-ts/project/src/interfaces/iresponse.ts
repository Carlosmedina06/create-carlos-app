import { Request, Response } from 'express'

export interface IResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: Request, res: Response, message: any, status: any): any
}
