import dotenv from 'dotenv'

import logger from './src/utils/helpers/logger'
import server from './src/app'

dotenv.config()

const port = process.env.PORT

    server.listen(port, async () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  .catch((err) => {
    logger.error(`❌[server]: Unable to start the server: ${err}`)
  })
