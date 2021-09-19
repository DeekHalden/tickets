import { Router } from 'express'

import { prefix } from '../../consts'
import { validateRequest } from '../middlewares/validate-request'
import { requestValidationMiddleware } from '../middlewares/request-validation-rules'
import { signup } from '../controllers/signup'

const router = Router()

router.post(
  `${prefix}/users/signup`,
  requestValidationMiddleware,
  validateRequest,
  signup
)

export { router as signupRouter }
