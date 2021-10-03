import { Types } from 'mongoose'
import request from 'supertest'

import { prefix } from '../../../consts'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

import { natsWrapper as natsWrapperMock } from '../../nats-wrapper'

it('returns a 404 if provided id does not exist', async () => {
  const id = new Types.ObjectId().toHexString()
  await request(app)
    .put(`${prefix}/tickets/${id}`)
    .set('Cookie', signin())
    .send({ title: 'qwe', price: 24 })
    .expect(404)
})
it('returns a 401 if the user is not authenticated', async () => {
  const id = new Types.ObjectId().toHexString()
  await request(app)
    .put(`${prefix}/tickets/${id}`)
    .send({ title: 'qwe', price: 24 })
    .expect(401)
})
it('returns a 401 if the user does not own the ticket', async () => {
  const ticketResponse = await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', signin())
    .send({ title: 'qwe', price: 24 })
    .expect(201)

  await request(app)
    .put(`${prefix}/tickets/${ticketResponse.body.data.id}`)
    .set('Cookie', signin({ email: 'qwe@qwe.ff', id: '12sdz' }))
    .send({ title: 'qwe', price: 24 })
    .expect(401)
})
it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signin()
  const ticketResponse = await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'qwe', price: 24 })
    .expect(201)

  expect(natsWrapperMock.client.publish).toHaveBeenCalledTimes(1)

  await request(app)
    .put(`${prefix}/tickets/${ticketResponse.body.data.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 24 })
    .expect(400)

  await request(app)
    .put(`${prefix}/tickets/${ticketResponse.body.data.id}`)
    .set('Cookie', cookie)
    .send({ title: 'qweqw', price: -2 })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {
  const cookie = signin()
  const createTicket = await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'qwe', price: 24 })
    .expect(201)
  await request(app)
    .put(`${prefix}/tickets/${createTicket.body.data.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 20 })
    .expect(200)

  const ticketResponse = await request(app).get(
    `${prefix}/tickets/${createTicket.body.data.id}`
  )
  expect(ticketResponse.body.data.title).toEqual('new title')
  expect(ticketResponse.body.data.price).toEqual(20)

  expect(natsWrapperMock.client.publish).toHaveBeenCalled()
  expect(natsWrapperMock.client.publish).toHaveBeenCalledTimes(2)
})

it('rejects updates if the ticket is reseved', async () => {
  const cookie = signin()
  const createTicket = await request(app)
    .post(`${prefix}/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'qwe', price: 24 })
    .expect(201)

  const ticket = await Ticket.findById(createTicket.body.data.id)

  ticket!.set({ orderId: new Types.ObjectId().toHexString() })
  await ticket!.save()

  await request(app)
    .put(`${prefix}/tickets/${createTicket.body.data.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 20 })
    .expect(400)
})
