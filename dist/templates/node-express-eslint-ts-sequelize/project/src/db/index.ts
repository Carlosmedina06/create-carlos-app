import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import logger from '../utils/helpers/logger'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_URL,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
)

const tryConnection = async () => {
  try {
    await sequelize.authenticate()
    logger.info(`⚡️[server]: Connected to database: ${process.env.DB_NAME}`)
  } catch (error) {
    logger.error(`⚡️[server]: Unable to connect to the database: ${error}`)
  }
}

tryConnection()

export default sequelize
