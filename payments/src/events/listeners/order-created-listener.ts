import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@microservices-tessera/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'
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
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    })

    await order.save()

    msg.ack()
  }
}
