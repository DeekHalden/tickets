import { Request, Response, Router } from 'express'
import { verify } from 'jsonwebtoken'
import { prefix } from '../../consts'
import { BadRequestError } from '../errors/bad-request-error'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'
import { User } from '../models/user'

const router = Router()

router.get(
  `${prefix}/users/currentuser`,
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res.send({ data: { user: req.currentUser } })
  }
)

export { router as currentUserRouter }
