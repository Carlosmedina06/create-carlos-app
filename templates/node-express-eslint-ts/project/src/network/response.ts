import { IResponse } from '../interfaces/iresponse'

export const success: IResponse = (_req, res, message, status) => {
  res.status(status).send({
    error: false,
    status: status || '200',
    body: message || '',
  })
}

export const error: IResponse = function (_req, res, message, status) {
  res.status(status).send({
    error: true,
    status: status || '500',
    body: message || 'Internal server error',
  })
}
