import { Router } from 'express'

import { requireAuth } from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { getAllOrders } from '../controllers'

const router = Router()

router.get(`${prefix}/orders`, requireAuth, getAllOrders)

export { router as getAllOrdersRouter }
