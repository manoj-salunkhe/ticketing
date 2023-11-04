import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@msticketings/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    // findByEvent is the custom method written by you, CTRL click and see the method
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // To manually set the version the DB
    // without using updateIfCurrentPlugin  uncommment
    // below code and also uncomment ticketSchema.pre function
    // in ticket model file and comment the ticketSchema.plugin(updateIfCurrentPlugin);
    // in the same file

    // const { title, price, version } = data;
    // ticket.set({ title, price, version });

    const { title, price } = data;
    ticket.set({ title, price });

    await ticket.save();
    msg.ack();
  }
}
