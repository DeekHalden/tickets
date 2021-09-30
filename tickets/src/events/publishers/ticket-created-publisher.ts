import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@microservices-tessera/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
