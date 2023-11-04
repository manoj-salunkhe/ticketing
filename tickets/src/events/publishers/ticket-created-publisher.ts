import { Publisher, Subjects, TicketCreatedEvent } from "@msticketings/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
