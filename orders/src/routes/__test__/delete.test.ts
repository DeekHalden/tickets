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
    title: 'concert',
    price: 20,
    id: new Types.ObjectId().toHexString()
  })
  await ticket.save()
  return ticket
}

it('changes the status of an order to canceled', async () => {
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
    .patch(`${prefix}/orders/${orderId}`)
    .set('Cookie', signin({ email: 'wqe@wqe.fm', id: 'qwe21'}))
    .send()
    .expect(404)


  const order = await request(app)
    .patch(`${prefix}/orders/${orderId}`)
    .set('Cookie', user)
    .send()
    .expect(200)

  expect(order.body.data.status).toEqual(OrderStatus.Cancelled)
  expect(order.body.data.id).toEqual(orderId)

})

it('emits an order on delete event', async () => {
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
    .patch(`${prefix}/orders/${orderId}`)
    .set('Cookie', user)
    .send()
    .expect(200)

  expect(natsWrapperMock.client.publish).toHaveBeenCalled()
})