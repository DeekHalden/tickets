import { Request, Response, Router } from 'express'
import { sign, verify } from 'jsonwebtoken'

import { prefix } from '../../consts'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'
import { requestValidationMiddleware } from '../middlewares/request-validation-rules'

const router = Router()

router.post(
  `${prefix}/users/signup`,
  requestValidationMiddleware,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password })
    await user.save()

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

    res.status(201).send({
      data: { user },
    })
  }
)

export { router as signupRouter }
