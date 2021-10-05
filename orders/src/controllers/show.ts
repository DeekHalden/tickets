import { NotFoundError } from '@microservices-tessera/common'
import { Request, Response } from 'express'
import { Order } from '../models/order'

export const show = async (req: Request, res: Response) => {
  console.log(req.params.orderId)
  const order = await Order.findById(req.params.orderId).populate('ticket')

  if (!order || order.userId !== req.currentUser!.id) {
    throw new NotFoundError()
  }
  res.send({ data: order })
}
