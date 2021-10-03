import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@microservices-tessera/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
