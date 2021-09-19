import { Router } from 'express'
import { prefix } from '../../consts'
import { signout } from '../controllers/signout'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const router = Router()

router.post(`${prefix}/users/signout`, currentUser, requireAuth, signout)

export { router as signoutRouter }
