import { Router } from 'express'

import { prefix } from '../../consts'
import {
  validateRequest,
  requestValidationMiddleware,
} from '@microservices-tessera/common'
import { signup } from '../controllers/signup'

const router = Router()

router.post(
  `${prefix}/users/signup`,
  requestValidationMiddleware,
  validateRequest,
  signup
)

export { router as signupRouter }
