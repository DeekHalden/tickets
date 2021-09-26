import { Router } from 'express'
import { prefix } from '../../consts'
import { signout } from '../controllers/signout'
import { currentUser, requireAuth } from '@microservices-tessera/common'

const router = Router()

router.post(`${prefix}/users/signout`, currentUser, requireAuth, signout)

export { router as signoutRouter }
