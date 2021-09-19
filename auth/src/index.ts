import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Please assign a JWT_KEY variable')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

start()
