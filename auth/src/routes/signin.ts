import { Router } from 'express'
import { prefix } from '../../consts'

const router = Router()

router.post(`${prefix}/users/signin`, (req, res) => {
  res.send('Hi there!')
})

export { router as signinRouter}