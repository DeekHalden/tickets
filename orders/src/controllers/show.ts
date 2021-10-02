import { NotFoundError } from '@microservices-tessera/common'
import { Request, Response } from 'express'
import { Order } from '../models/order'

export const show = async (req: Request, res: Response) => {
  const order = await Order.findOne({
    id: req.params.orderId,
    userId: req.currentUser!.id,
  }).populate('ticket')

  if (!order) {
    throw new NotFoundError()
  }
  res.send({ data: order })
}
