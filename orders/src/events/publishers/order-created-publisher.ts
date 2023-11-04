import { Publisher, OrderCreatedEvent, Subjects } from "@msticketings/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
