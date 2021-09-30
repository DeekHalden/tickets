import { Router } from 'express'

import { prefix } from '../../consts'
import { showTickets } from '../controllers/show-tickets'

const router = Router()

router.get(`${prefix}/tickets/:id`, showTickets)

export { router as showTicketRouter }
