import request from 'supertest'
import { prefix } from '../../../consts'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
  return signup()
})

it('returns a 400 with an invalid email', async () => {
  return signup(400, {
    email: 'eqweqw',
    password: '123456',
  })
})

it('returns a 400 with an invalid password', async () => {
  return signup(400, {
    email: 'eqweqw',
    password: '123',
  })
})

it('returns a 400 with missing password and email', async () => {
  return signup(400, {})
})

it('returns a 400 with missing password or email', async () => {
  await signup(400, {
    email: 'hello@world.com',
  })
  await signup(400, {
    password: 'he',
  })
})

it('disallows diplucate email', async () => {
  await signup()
  await signup(400)
})

it('it sets session cookie header on signup', async () => {
  const cookie = await signup()
  expect(cookie).toBeDefined()
})
