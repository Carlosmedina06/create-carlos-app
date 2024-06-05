//eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')

const doc = {
  info: {
    title: '{{name}} API',
    description: 'Documentación de la API de {{name}}',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'authorization',
      in: 'header',
      description: 'Token JWT de autorizacion',
    },
  },
  security: [{ bearerAuth: [] }],
  schemes: ['https', 'http'],
  basePath: '/api',
  host: null,
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
