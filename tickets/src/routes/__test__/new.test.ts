import request from 'supertest'

import { prefix } from '../../../consts'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { natsWrapper as natsWrapperMock } from '../../nats-wrapper'

it('has a route handler listening to /api/v1/tickets for post requests', async () => {
  const response = await request(app).post(`${prefix}/tickets`).send({})
  expect(response.statusCode).not.toEqual(404)
})
it('can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post(`${prefix}/tickets`)
    .send()
    .expect(401)
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
      price: 'Olleh Dlrow',
    })
    .expect(400)
})
it('creates a ticker with valid inputs', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)
  const ticket = {
    title: 'Hello',
    price: 10,
  }
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send(ticket)
    .expect(201)
  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].price).toEqual(ticket.price)
})

it('published an event', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)
  const ticket = {
    title: 'Hello',
    price: 10,
  }
  await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send(ticket)
    .expect(201)

  expect(natsWrapperMock.client.publish).toHaveBeenCalled()
  expect(natsWrapperMock.client.publish).toHaveBeenCalledTimes(1)
})
