import request from 'supertest'
import { Types } from 'mongoose'

import { prefix } from '../../../consts'
import { app } from '../../app'

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
    .get(`${prefix}/tickets/${response.body.data.id}`)
    .send()
    .expect(200)

  expect(ticketResponse.body.data.title).toEqual(ticket.title)
  expect(ticketResponse.body.data.price).toEqual(ticket.price)
})
