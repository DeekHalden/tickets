import request from 'supertest'
import { prefix } from '../../../consts'

import { app } from '../../app'

it('has a route handler listening to /api/v1/tickets for post requests', async () => {
  const response = await request(app).post(`${prefix}/tickets`).send({})
  expect(response.statusCode).not.toEqual(404)
})
it('can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post(`${prefix}/tickets`)
    .send()
    .expect(401)
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send({
      title: 'Hello',
      price: 10,
    })
    .expect(200)

  // expect(true).toBe(false)
})
it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400)
})
it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send({
      title: 'Hello',
      price: 'qwe123',
    })
    .expect(400)
})
it('creates a ticker with valid inputs', async () => {
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send({
      title: 'Hello',
      price: 10,
    })
    .expect(200)
})
