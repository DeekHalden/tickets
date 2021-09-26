import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { BadRequestError } from '@microservices-tessera/common'
import { User } from '../models/user'

export const signin = async (req: Request, res: Response) => {
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
