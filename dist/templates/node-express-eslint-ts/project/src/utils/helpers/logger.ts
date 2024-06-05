import * as path from 'path'

import winston from 'winston'

const rootFolderPath = path.resolve(__dirname, '../')

// Define log levels
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logLevels: any = {
  error: 'error.log',
  info: 'info.log',
  trace: 'trace.log',
}

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`
    }),
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    ...Object.keys(logLevels).map((level) => {
      return new winston.transports.File({
        filename: `${rootFolderPath}/logs/${logLevels[level]}`,
        level,
      })
    }),
  ],
})

export default logger
