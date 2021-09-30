import { Request, Response } from 'express'

import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import { Ticket } from '../models/ticket'
import { natsWrapper } from '../nats-wrapper'

export const handleNew = async (req: Request, res: Response) => {
  const { title, price } = req.body
  const ticket = Ticket.build({ price, title, userId: req.currentUser!.id })
  await ticket.save()

  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title,
    price,
    userId: req.currentUser!.id,
  })

  res.status(201).send({ data: ticket })
}
