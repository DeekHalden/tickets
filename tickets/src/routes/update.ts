import { Router } from 'express'
import { body } from 'express-validator'

import { requireAuth, validateRequest } from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { updateTicket } from '../controllers/update-ticket'

const router = Router()

router.put(
  `${prefix}/tickets/:id`,
  requireAuth,
  [
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('title').not().isEmpty().withMessage('Title is required'),
  ],
  validateRequest,
  updateTicket
)

export { router as updateTicketRouter }
