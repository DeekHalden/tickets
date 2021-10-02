import { Request, Response } from 'express'
import { Order } from '../models/order'

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    'ticket'
  )
  res.send({ data: orders })
}
