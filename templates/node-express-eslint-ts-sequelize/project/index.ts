import dotenv from 'dotenv'

import logger from './src/utils/helpers/logger'
import server from './src/app'
import db from './src/db'

dotenv.config()

const port = process.env.PORT

db.sync({ alter: true })
  .then(() => {
    server.listen(port, async () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    logger.error(`❌[server]: Unable to start the server: ${err}`)
  })
