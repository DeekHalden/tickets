import { NextFunction, Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { prefix } from '../../consts'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

const router = Router()

router.post(
  `${prefix}/users/signup`,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }
    throw new DatabaseConnectionError()
    console.log('Creating a user...')
    const { email, password } = req.body
    console.log(email)
    console.log(password)
    res.send({})
  }
)

export { router as signupRouter }
