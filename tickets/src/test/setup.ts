import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'
import { prefix } from '../../consts'
let mongo: MongoMemoryServer

declare global {
  var signin: (
    statusCode?: number,
    data?: { email?: string; password?: string }
  ) => Promise<string[]>
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
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signup = async (
  status = 201,
  data = { email: 'test@test.com', password: 'password' }
) => {
  const response = await request(app)
    .post(`${prefix}/users/signup`)
    .send(data)
    .expect(status)
  const cookie = response.get('Set-Cookie')
  return cookie
}

global.signin = async (
  status = 200,
  data = { email: 'test@test.com', password: 'password' }
) => {
  const response = await request(app)
    .post(`${prefix}/users/signin`)
    .send(data)
    .expect(status)
  const cookie = response.get('Set-Cookie')
  return cookie
}
