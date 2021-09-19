import { Request, Response, Router } from 'express'
import { sign, verify } from 'jsonwebtoken'

import { prefix } from '../../consts'
import { BadRequestError } from '../errors/bad-request-error'
import { validateBody } from '../middlewares/validate-body'
import { User } from '../models/user'
import { requestValidationRules } from './request-validation-rules'

const router = Router()

router.post(
  `${prefix}/users/signin`,
  requestValidationRules,
  validateBody,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password))) {
      throw new BadRequestError('Incorrect email or password')
    }
    res.status(200).send({
      data: user,
    })
  }
)

export { router as signinRouter }
