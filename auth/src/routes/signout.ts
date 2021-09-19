import { Router } from 'express'
import { prefix } from '../../consts'

const router = Router()

router.post(`${prefix}/users/signout`, (req, res) => {
  res.send('Hi there!')
})

export { router as signoutRouter}