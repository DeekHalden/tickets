import { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

export const handleNew = async (req: Request, res: Response) => {
  const { title, price } = req.body
  const ticket = Ticket.build({ price, title, userId: req.currentUser!.id })
  await ticket.save()

  res.status(201).send({ data: ticket })
}
