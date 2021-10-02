import request from 'supertest'

import { OrderStatus } from '@microservices-tessera/common'
import { Types } from 'mongoose'

import { app } from '../../app'
import { prefix } from '../../../consts'

import { natsWrapper as natsWrapperMock } from '../../nats-wrapper'

import { Ticket } from '../../models/ticket'
import { Order } from '../../models/order'

it('returns an error if the ticket doesnt exist', async () => {
  const ticketId = new Types.ObjectId().toHexString()

  await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', signin())
    .send({ ticketId })
    .expect(404)
})

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  })
  await ticket.save()

  const order = Order.build({
    ticket,
    userId: 'wqe',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  })

  await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', signin())
    .send({ ticketId: ticket.id })
    .expect(400)
})

it('reserves a ticket', async () => {
  expect(true).toBeFalsy()
})
