import { Router } from 'express'
import {
  validateRequest,
  
} from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { signin } from '../controllers/signin'
import { requestValidationMiddleware } from '../middlewares/request-validation'

const router = Router()

router.post(
  `${prefix}/users/signin`,
  requestValidationMiddleware,
  validateRequest,
  signin
)

export { router as signinRouter }
