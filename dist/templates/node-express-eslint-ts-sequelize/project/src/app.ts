import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

// eslint-disable-next-line node/no-unpublished-import
import swaggerFile from '../swagger-output.json'

import apiRouter from './routes'
import errors from './network/error'

import './models'

dotenv.config()

const server: Express = express()

server.use(express.static('public'))
server.use(cors({ origin: '*' }))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan('dev'))

server.get('/', (req: Request, res: Response) => {
  res.send('API is running')
})

server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
server.use('/api', apiRouter)

server.use(errors)

export default server
