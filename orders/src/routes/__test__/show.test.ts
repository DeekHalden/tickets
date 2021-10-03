import request from 'supertest'
import { Types } from 'mongoose'

import { OrderStatus } from '@microservices-tessera/common'

import { app } from '../../app'
import { prefix } from '../../../consts'

import { natsWrapper as natsWrapperMock } from '../../nats-wrapper'

import { Ticket } from '../../models/ticket'
import { Order } from '../../models/order'

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  })
  await ticket.save()
  return ticket
}

it('throws 404 if order does not belong to user', async () => {
  const ticket = await buildTicket()

  const user = signin()

  const {
    body: {
      data: { id: orderId },
    },
  } = await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })

  await request(app)
    .get(`${prefix}/orders/${orderId}`)
    .set('Cookie', signin({ email: 'd@ddd.fm', id: 'qwe123' }))
    .send()
    .expect(404)

  await request(app)
    .get(`${prefix}/orders/${orderId}`)
    .set('Cookie', user)
    .send()
    .expect(200)
})

it('fetches specific order for a particular user', async () => {
  const ticket = await buildTicket()

  const user = signin()

  const {
    body: {
      data: { id: orderId },
    },
  } = await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', user)
    .send({ ticketId: ticket.id })

  const response = await request(app)
    .get(`${prefix}/orders/${orderId}`)
    .set('Cookie', user)
    .send()
    .expect(200)

  expect(response.body.data.status).toBe(OrderStatus.Created)

  expect(response.body.data.id).toEqual(orderId)
})
