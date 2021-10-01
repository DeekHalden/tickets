import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@microservices-tessera/common'

import { getAllOrdersRouter } from './routes'
import { deleteOrdersRouter } from './routes/delete'
import { showOrdersRouter } from './routes/show'
import { newOrdersRouter } from './routes/new'

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

app.use(currentUser)
app.use(getAllOrdersRouter)
app.use(deleteOrdersRouter)
app.use(showOrdersRouter)
app.use(newOrdersRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
