import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import './google-auth'

import { errorHandler, NotFoundError } from '@microservices-tessera/common'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { googleRouter } from './routes/google'
import passport from 'passport'

const app = express()
app.set('trust proxy', true)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(passport.initialize())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(googleRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
