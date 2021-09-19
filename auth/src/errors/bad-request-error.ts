import { CustomError } from './custom-error'
import { ErrorFields } from './error-fields.interface'

export class BadRequestError extends CustomError {
  statusCode: number = 400
  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  serializeErrors(): ErrorFields {
    return [{ message: this.message }]
  }
}
