import { CustomError } from './custom-error'
import { ErrorFields } from './error-fields.interface'

export class NotAuthorizedError extends CustomError {
  statusCode = 401
  constructor() {
    super('Not Authrorized')
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }
  serializeErrors(): ErrorFields {
    return [
      {
        message: 'Not Authorized',
      },
    ]
  }
}
