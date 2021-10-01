import { Router } from 'express'
import { body } from 'express-validator'
import { Types } from 'mongoose'

import { requireAuth, validateRequest } from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { newOrder } from '../controllers/new'

const router = Router()

router.post(
  `${prefix}/orders`,
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  newOrder
)

export { router as newOrdersRouter }
