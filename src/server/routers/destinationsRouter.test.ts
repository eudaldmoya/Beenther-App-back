import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "..";
import connectToDatabase from "../../database/connectToDatabase";
import Destination from "../../database/models/Destination";
import User from "../../database/models/User";
import { destinationsMock } from "../../mocks/destinationsMock";
import { authIdMock, userMock } from "../../mocks/userMock";
import { type DestinationStructure } from "../../types";

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

const token = {
  uid: authIdMock,
};

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

describe("Given a GET /destinations endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and the destinations ", async () => {
      const path = "/destinations";
      const expectedStatus = 200;

      await Destination.create(destinationsMock);
      await User.create(userMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatus);

      const responseBody = response.body as {
        destinations: DestinationStructure[];
      };

      responseBody.destinations.forEach(
        (destination: DestinationStructure, destinationPosition: number) => {
          expect(destination).toHaveProperty(
            "name",
            destinationsMock[destinationPosition].name,
          );
        },
      );
    });
  });
});
