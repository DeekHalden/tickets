import { Request, Response, Router } from 'express'
import { prefix } from '../../consts'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from '../models/user'

const router = Router()

router.get(
  `${prefix}/users/currentuser`,
  async (req: Request, res: Response) => {
    const { email } = req.query
    console.log(email)
    const user = await User.findOne({ email: email as string })
    if (!user) {
      throw new BadRequestError('User not found')
    }
    res.status(200).json({
      data: user,
    })
  }
)

export { router as currentUserRouter }
