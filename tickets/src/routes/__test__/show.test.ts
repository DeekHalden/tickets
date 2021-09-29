import request from 'supertest'
import { Types } from 'mongoose'

import { prefix } from '../../../consts'
import { app } from '../../app'

it('returns a 404 if the ticket is not found', async () => {
  const id = new Types.ObjectId().toHexString()
  await request(app).get(`${prefix}/tickets/${id}`).send().expect(404)
})

it('returns the ticket if it is found', async () => {
  const ticket = {
    title: 'concert',
    price: 20,
  }
  const response = await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send(ticket)
    .expect(201)

  const ticketResponse = await request(app)
    .get(`${prefix}/tickets/${response.body.id}`)
    .send()
    .expect(200)

  expect(ticketResponse.body.title).toEqual(ticket.title)
  expect(ticketResponse.body.price).toEqual(ticket.price)
})
