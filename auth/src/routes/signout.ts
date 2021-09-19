import { Router } from 'express'
import { prefix } from '../../consts'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const router = Router()

router.post(`${prefix}/users/signout`, currentUser, requireAuth, (req, res) => {
  req.session = null
  res.status(204).send({})
})

export { router as signoutRouter }
