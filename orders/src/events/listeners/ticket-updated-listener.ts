import { Message } from 'node-nats-streaming'

import {
  Listener,
  Subjects,
  TicketUpdatedEvent,
} from '@microservices-tessera/common'

import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = queueGroupName
  async onMessage(
    data: { id: string; title: string; price: number; userId: string, version: number },
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findByEvent(data)
    if (!ticket) {
      throw new Error('Ticket not found')
    }

    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
