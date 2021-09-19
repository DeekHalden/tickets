import { Router } from 'express'
import { prefix } from '../../consts'

const router = Router()

router.get(`${prefix}/users/currentuser`, (req, res) => {
  res.send('Hi there!')
})

export { router as currentUserRouter}