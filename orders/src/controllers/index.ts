import { Request, Response } from 'express';

export const getAllOrders = async (req: Request, res: Response) => {
  res.send('hello')
}