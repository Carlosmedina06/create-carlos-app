declare global {
  namespace Express {
    interface Request {}
  }
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | number
      DB_NAME: string
      DB_URL: string
      DB_USER: string
      DB_PASSWORD: string
      DB_DIALECT: 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql'
      BUCKET_NAME: string
      AWS_REGION: string
      AWS_ACCESS_KEY: string
      AWS_SECRET_KEY: string
      NODE_ENV: 'development' | 'production' | 'staging' | 'test'
    }
  }
}
export {}
