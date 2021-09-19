import { Router } from 'express'
import { prefix } from '../../consts'
import { getCurrentUser } from '../controllers/current-user'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const router = Router()

router.get(
  `${prefix}/users/currentuser`,
  currentUser,
  requireAuth,
  getCurrentUser
)

export { router as currentUserRouter }
