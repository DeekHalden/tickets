import request from 'supertest'
import { prefix } from '../../../consts'
import { app } from '../../app'

it('clears a cookie after signing out', async () => {
  const cookie = await signup()
  const response = await request(app)
    .post(`${prefix}/users/signout`)
    .set('Cookie', cookie)
    .expect(204)
  expect(response.get('Set-Cookie')).toEqual([
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  ])
})
