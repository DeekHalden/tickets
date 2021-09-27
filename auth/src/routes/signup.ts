import { Router } from 'express'

import { prefix } from '../../consts'
import {
  validateRequest,
  
} from '@microservices-tessera/common'
import { signup } from '../controllers/signup'
import { requestValidationMiddleware } from '../middlewares/request-validation'

const router = Router()

router.post(
  `${prefix}/users/signup`,
  requestValidationMiddleware,
  validateRequest,
  signup
)

export { router as signupRouter }
