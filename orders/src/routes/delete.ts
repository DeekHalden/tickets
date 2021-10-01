import { Router } from 'express'
import { prefix } from '../../consts'
import { getAllOrders } from '../controllers'

const router = Router()

router.delete(`${prefix}/orders/:orderId`, getAllOrders)


export { router as deleteOrdersRouter}