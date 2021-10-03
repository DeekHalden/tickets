import { Message } from 'node-nats-streaming'
import { Types } from 'mongoose'

import { OrderCreatedEvent, OrderStatus } from '@microservices-tessera/common'

import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { OrderCreatedListener } from '../order-created-listener'

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client)

  const ticket = Ticket.build({
    title: 'concert',
    price: 19,
    userId: 'qwe',
  })

  await ticket.save()

  const data: OrderCreatedEvent['data'] = {
    id: new Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: 'qwe',
    version: 0,
    expiresAt: 'qwe',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  }


  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, ticket, data, msg }
}

it('sets the userId of the ticket', async () => {
  const { data, listener, msg, ticket} = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message', async () => {

})
