import { requireAuth, validateRequest } from '@microservices-tessera/common'
import { Router } from 'express'
import { body } from 'express-validator'
import { prefix } from '../../consts'
import { handleNew } from '../controllers/new'

const router = Router()

router.post(
  `${prefix}/tickets`,
  requireAuth,
  [
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('title').not().isEmpty().withMessage('Title is required'),
  ],
  validateRequest,
  handleNew
)

export { router as createTicketRouter }
