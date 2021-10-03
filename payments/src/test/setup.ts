import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

import { app } from '../app'
import { prefix } from '../../consts'
jest.mock('../nats-wrapper')

let mongo: MongoMemoryServer


declare global {
  var signin: (payload?: { id: string; email: string }) => string[]
  var signup: (
    statusCode?: number,
    data?: { email?: string; password?: string }
  ) => Promise<string[]>
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  jest.clearAllMocks()

  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = (
  payload: { id: string; email: string } = {
    id: 'qwe123x',
    email: 'test@test.com',
  }
) => {
  const token = sign(payload, process.env.JWT_KEY!)

  const session = { jwt: token }
  const sessionJSON = JSON.stringify(session)

  const base64 = Buffer.from(sessionJSON).toString('base64')
  return [`express:sess=${base64}`]
}
