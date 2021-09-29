import { Router } from 'express'
import { prefix } from '../../consts'
import { getTickets } from '../controllers/get-tickets'

const router = Router()

router.get(`${prefix}/tickets`, getTickets)

export { router as indexRouter }
