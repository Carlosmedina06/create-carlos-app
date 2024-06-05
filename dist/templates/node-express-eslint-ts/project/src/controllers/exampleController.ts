import { NextFunction, Request, Response } from 'express'
import { success } from '../network/response'



const exampleController = {

  getExample: async (req: Request, res: Response, next: NextFunction) => {
    try {
      success(req, res, 'Example controller works', 200)
    } catch (error) {
      next(error)
    }
  }
 
}

export default exampleController
