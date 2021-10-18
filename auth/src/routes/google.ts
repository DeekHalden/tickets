import { Router } from 'express'
import passport from 'passport'
import { prefix } from '../../consts'
import { googleRedirect } from '../controllers/google'

const router = Router()

router.get(
  `${prefix}/users/google`,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
)

router.get(
  `${prefix}/users/google/redirect`,
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${prefix}/users/signin`,
  }),
  googleRedirect
)

export { router as googleRouter }