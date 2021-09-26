import { Router } from 'express'
import { prefix } from '../../consts'
import { getCurrentUser } from '../controllers/current-user'
import { currentUser, requireAuth } from '@microservices-tessera/common'

const router = Router()

router.get(
  `${prefix}/users/currentuser`,
  currentUser,
  // requireAuth,
  getCurrentUser
)

export { router as currentUserRouter }
