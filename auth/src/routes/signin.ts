import { Request, Response, Router } from 'express'
import { sign } from 'jsonwebtoken'

import { prefix } from '../../consts'
import { validateRequest } from '../middlewares/validate-request'
import { requestValidationMiddleware } from '../middlewares/request-validation-rules'
import { signin } from '../controllers/signin'

const router = Router()

router.post(
  `${prefix}/users/signin`,
  requestValidationMiddleware,
  validateRequest,
  signin
)

export { router as signinRouter }
