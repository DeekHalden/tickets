import { Request, Response } from 'express'

import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
} from '@microservices-tessera/common'

import { TicketUpdatedPublisher } from '../events/publishers/ticket-update-publisher'
import { Ticket } from '../models/ticket'
import { natsWrapper } from '../nats-wrapper'

export const updateTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFoundError()
  }

  if (ticket.orderId) {
    throw new BadRequestError('Cannot edit ad reserved ticket')
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }

  const { title, price } = req.body

  ticket.set({
    title,
    price,
  })
  await ticket.save()
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title,
    price,
    userId: req.currentUser!.id,
    version: ticket.version,
  })
  res.send({ data: ticket })
}
