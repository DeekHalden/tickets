import { Request, Response } from 'express'

import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@microservices-tessera/common'

import { Order } from '../models/order'
import { stripe } from '../stripe'
import { Payment } from '../models/payment'

export const handleNewPayment = async (req: Request, res: Response) => {
  const { token, orderId } = req.body
  const order = await Order.findById(orderId)
  if (!order) {
    throw new NotFoundError()
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }
  if (order.status === OrderStatus.Cancelled) {
    throw new BadRequestError('Cannot pay for a cancelled order')
  }

  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: order.price * 100,
    source: token,
  })

  const payment = Payment.build({
    stripeId: charge.id,
    orderId
  })

  await payment.save()

  res.status(201).send({ data: payment })
}
