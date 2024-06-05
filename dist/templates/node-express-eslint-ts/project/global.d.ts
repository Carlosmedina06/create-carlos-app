declare global {
  namespace Express {
    interface Request {}
  }
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | number
      BUCKET_NAME: string
      AWS_REGION: string
      AWS_ACCESS_KEY: string
      AWS_SECRET_KEY: string
      NODE_ENV: 'development' | 'production' | 'staging' | 'test'
    }
  }
}
export {}
