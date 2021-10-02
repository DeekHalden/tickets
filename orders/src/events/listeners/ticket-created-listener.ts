import { Message } from 'node-nats-streaming'

import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from '@microservices-tessera/common'

import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = queueGroupName
  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    msg: Message
  ): Promise<void> {
    const { title, price, id } = data
    const ticket = Ticket.build({
      title,
      price,
      id,
    })
    await ticket.save()

    msg.ack()
  }
}
