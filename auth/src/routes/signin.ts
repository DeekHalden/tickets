import { Request, Response, Router } from 'express'
import { sign } from 'jsonwebtoken'

import { prefix } from '../../consts'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'
import { requestValidationMiddleware } from '../middlewares/request-validation-rules'

const router = Router()

router.post(
  `${prefix}/users/signin`,
  requestValidationMiddleware,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password))) {
      throw new BadRequestError('Incorrect email or password')
    }
    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )
    req.session = {
      jwt: token,
    }
    res.status(200).send({
      data: { user },
    })
  }
)

export { router as signinRouter }
