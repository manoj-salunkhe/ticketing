import { PaymentCreatedEvent, Subjects, Publisher } from "@msticketings/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
