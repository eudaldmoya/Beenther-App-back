import connectToDatabase from "../database/connectToDatabase";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from ".";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const dburl = server.getUri();
  await connectToDatabase(dburl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should repond with status 200 and message 'pong :)'", async () => {
      const path = "/";
      const expectedStatus = 200;
      const expectedMessage = "pong :)";

      const response = await request(app).get(path).expect(expectedStatus);

      const bodyResponse = response.body as {
        message: string;
      };
      expect(bodyResponse).toHaveProperty("message", expectedMessage);
    });
  });
});
