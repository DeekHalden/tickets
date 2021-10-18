import { Request, Response } from 'express';

export const googleRedirect = (req: Request, res: Response) => {
  req.session = {
    jwt: req.user
  }
  res.redirect('/'); //req.user has the redirection_url
}