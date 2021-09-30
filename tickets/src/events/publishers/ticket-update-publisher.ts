import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@microservices-tessera/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
