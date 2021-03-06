import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@microservices-tessera/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}
