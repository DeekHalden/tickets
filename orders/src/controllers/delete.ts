import { Request, Response } from 'express'

import { NotFoundError, OrderStatus } from '@microservices-tessera/common'

import { Order } from '../models/order'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'

export const deleteOrder = async (req: Request, res: Response) => {
  const order = await Order.findOne({
    userId: req.currentUser!.id,
    id: req.params.orderId,
  }).populate('ticket')

  if (!order) {
    throw new NotFoundError()
  }

  order.set('status', OrderStatus.Cancelled)
  await order.save()

  await new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  })

  res.status(200).send({ data: order })
}
