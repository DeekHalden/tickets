import request from 'supertest'
import { prefix } from '../../../consts'
import { app } from '../../app'

it('responds with details about the current user', async () => {
  const cookie = await signup()
  const response = await request(app)
    .get(`${prefix}/users/currentuser`)
    .set('Cookie', cookie)
    .send()
    .expect(200)
  expect(response.body.data.user.email).toEqual('test@test.com')
})


it('responds with details about the current user', async () => {
  await request(app)
    .get(`${prefix}/users/currentuser`)
    .send()
    .expect(401)
})