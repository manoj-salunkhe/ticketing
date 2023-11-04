import { Publisher, Subjects, TicketUpdatedEvent } from "@msticketings/common";

export class TickeUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
