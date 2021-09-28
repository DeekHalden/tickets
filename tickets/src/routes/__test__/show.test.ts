import request from 'supertest'
import { prefix } from '../../../consts'
import { app } from '../../app'

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get(`${prefix}/tickets/qweadqwe`).send().expect(404)
})

it('returns the ticket if it is found', async () => {
  const ticket = {
    title: 'concert',
    price: 20,
  }
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send(ticket)
    .expect(201)
  await request(app).get(`${prefix}/tickets/${ticket.title}`).send().expect(200)
})
