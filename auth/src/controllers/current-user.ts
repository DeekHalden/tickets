import { Request, Response } from 'express'

export const getCurrentUser = (req: Request, res: Response) => {
  res.send({ data: { user: req.currentUser } })
}
