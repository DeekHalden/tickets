import { Router } from 'express'

import { requireAuth } from '@microservices-tessera/common'

import { prefix } from '../../consts'
import { deleteOrder } from '../controllers/delete'

const router = Router()

router.patch(`${prefix}/orders/:orderId`, requireAuth, deleteOrder)

export { router as deleteOrdersRouter }
