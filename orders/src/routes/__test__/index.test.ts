import request from 'supertest'

import { OrderStatus } from '@microservices-tessera/common'
import { Types } from 'mongoose'

import { app } from '../../app'
import { prefix } from '../../../consts'

import { natsWrapper as natsWrapperMock } from '../../nats-wrapper'

import { Ticket } from '../../models/ticket'
import { Order } from '../../models/order'

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  })
  await ticket.save()
  return ticket
}

it('fetches orders for a particular user', async () => {
  const ticketOne = await buildTicket()
  const ticketTwo = await buildTicket()
  const ticketThree = await buildTicket()

  const userOne = signin()
  const userTwo = signin({ email: 'q@wq.fm', id: 'qwe12' })

  await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })

  const { body: orderOne } = await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
  const { body: orderTwo } = await request(app)
    .post(`${prefix}/orders`)
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })

  const {
    body: { data },
  } = await request(app)
    .get(`${prefix}/orders`)
    .set('Cookie', userTwo)
    .send()
    .expect(200)
  expect(data).toHaveLength(2)
  
  expect(data[0].id).toEqual(orderOne.data.id)
  expect(data[1].id).toEqual(orderTwo.data.id)
  
  expect(data[0].ticket.id).toEqual(ticketTwo.id)
  expect(data[1].ticket.id).toEqual(ticketThree.id)
})
