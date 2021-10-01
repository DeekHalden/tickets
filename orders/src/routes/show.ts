import { Router } from 'express'
import { prefix } from '../../consts'
import { getAllOrders } from '../controllers'

const router = Router()

router.get(`${prefix}/orders/:orderId`, getAllOrders)


export { router as showOrdersRouter}