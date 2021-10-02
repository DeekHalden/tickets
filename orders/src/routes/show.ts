import { Router } from 'express'

import { prefix } from '../../consts'
import { show } from '../controllers/show'

const router = Router()

router.get(`${prefix}/orders/:orderId`, show)


export { router as showOrdersRouter}