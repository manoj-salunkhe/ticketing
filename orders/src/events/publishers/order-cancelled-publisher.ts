import { Publisher, OrderCancelledEvent, Subjects } from "@msticketings/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
