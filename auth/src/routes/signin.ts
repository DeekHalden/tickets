import { Router } from 'express'
import {
  validateRequest,
  requestValidationMiddleware,
} from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { signin } from '../controllers/signin'

const router = Router()

router.post(
  `${prefix}/users/signin`,
  requestValidationMiddleware,
  validateRequest,
  signin
)

export { router as signinRouter }
