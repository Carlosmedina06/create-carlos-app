import { Router } from 'express'

import exampleController from '../controllers/exampleController'

const exampleRouter = Router()

exampleRouter.get('/', exampleController.getExample)


export default exampleRouter
