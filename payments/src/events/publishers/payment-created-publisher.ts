import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from '@microservices-tessera/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
