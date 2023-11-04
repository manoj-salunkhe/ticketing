import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticker-created-publisher";

console.clear();

// stan is also called as client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("publisher connected to nats");

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "129",
      title: "title",
      price: 20,
    });
  } catch (err) {
    console.log("Publisher Error");
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "title",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
