import { NotFoundError } from '@microservices-tessera/common'
import { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

export const showTickets = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    return new NotFoundError()
  }
  res.send({ data: ticket })
}
