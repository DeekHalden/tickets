import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@microservices-tessera/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
