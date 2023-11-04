import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "title",
    price: 20,
  });

  await ticket.save();
  return ticket;
};

it("fetches order for an particluar user", async () => {
  // Create three tickets
  const tikcetOne = await buildTicket();
  const tikcetTwo = await buildTicket();
  const tikcetThree = await buildTicket();

  const userOne = signin();
  const userTwo = signin();

  // Create one order as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: tikcetOne.id })
    .expect(201);

  // Create two order as User #2
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: tikcetTwo.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: tikcetThree.id })
    .expect(201);

  // Make request to get orders for User #2

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  // Make sure we only got the orders for User #2

  expect(response.body.length).toEqual(2);

  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(tikcetTwo.id);
  expect(response.body[1].ticket.id).toEqual(tikcetThree.id);
});
