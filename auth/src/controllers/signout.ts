import { Request, Response } from 'express'

export const signout = (req: Request, res: Response) => {
  req.session = null
  res.status(204).send({})
}
