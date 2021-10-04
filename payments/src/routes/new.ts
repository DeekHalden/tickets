import { requireAuth, validateRequest } from '@microservices-tessera/common'
import { Router } from 'express'

import { body } from 'express-validator'
import { prefix } from '../../consts'
import { handleNewPayment } from '../controllers/new'

const router = Router()

router.post(`${prefix}/payments`, requireAuth, [
  body('token').not().isEmpty(),
  body('orderId').not().isEmpty(),
  validateRequest,
  handleNewPayment
])

export { router as newPaymentRouter}
