import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { BadRequestError } from '@microservices-tessera/common'
import { User } from '../models/user'

export const signup = async (req: Request, res: Response) => {
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
