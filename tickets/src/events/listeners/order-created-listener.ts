import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@microservices-tessera/common'
import { Message } from 'node-nats-streaming'

import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-update-publisher'

import { queueGroupName } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = queueGroupName
  async onMessage(
    data: {
      id: string
      status: OrderStatus
      userId: string
      expiresAt: string
      version: number
      ticket: { id: string; price: number }
    },
    msg: Message
  ): Promise<void> {
    const {
      id: orderId,
      ticket: { id: ticketId },
    } = data

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.set({ orderId })
    await ticket.save()

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket!.orderId,
      version: ticket.version,
    })

    msg.ack()
  }
}
