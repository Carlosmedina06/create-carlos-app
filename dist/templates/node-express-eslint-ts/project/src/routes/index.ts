import { Router } from 'express'

import exampleRouter from './exampleRouter'

const router = Router()

router.use('/example', exampleRouter)

export default router
