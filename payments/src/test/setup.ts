import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

// process.env.STRIPE_KEY =
//   "sk_test_51KltLfSJnNBzyXo6JaQCpOQI5Zoscvaukh8cxxPXH2YFWi8dGtlbMfFei0a0VNaeKnWkoUDwbOUjrGY3oT9SvVt600J4EbPsqC";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload. {id, email}

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build the session object { jwt : MY_JWT }

  const session = { jwt: token };

  // Turn that session into JSON

  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
