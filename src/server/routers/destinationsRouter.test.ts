import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "..";
import connectToDatabase from "../../database/connectToDatabase";
import Destination from "../../database/models/Destination";
import User from "../../database/models/User";
import {
  destinationsMock,
  mongooseIdMockD1,
  newDestinationMock,
} from "../../mocks/destinationsMock";
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

afterEach(async () => {
  await Destination.deleteMany();
  await User.deleteMany();
});

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

describe("Given a DELETE destinations/:destinationId enpoint ", () => {
  describe("When it receives a request with an existant destinationId", () => {
    test("Then it should respond with status 200 and 'Destination deleted successfully'", async () => {
      const message = "Destination deleted successfully";
      const path = `/destinations/${mongooseIdMockD1}`;
      const expectedStatus = 200;

      await Destination.create(destinationsMock);
      await User.create(userMock);

      const response = await request(app)
        .delete(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message", message);
    });
  });
});

describe("Given a POST /destinations enpoint ", () => {
  describe("When it receives a request with a destination 'Angkor Wat'", () => {
    test("Then it should respond with status 201 and the new destination 'Angkor Wat'", async () => {
      const path = "/destinations";
      const expectedStatus = 201;

      await User.create(userMock);

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer token")
        .send(newDestinationMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("destination", newDestinationMock);
    });
  });
});

describe("Given a GET destinations/:destinationId enpoint ", () => {
  describe("When it receives a request with an existant destinationId", () => {
    test("Then it should respond with status 200 and the destination with that destinationId", async () => {
      const path = `/destinations/${mongooseIdMockD1}`;
      const expectedStatus = 200;

      await Destination.create(destinationsMock);
      await User.create(userMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatus);

      expect(response.body).toStrictEqual({ destination: destinationsMock[0] });
    });
  });
});

describe("Given a PATCH destinations/:destinationId enpoint ", () => {
  describe("When it receives a request with an existant destinationId louiseId and the destination 'Lake Louise'", () => {
    test.only("Then it should respond with status 204 and the destination modified", async () => {
      const path = `/destinations/${mongooseIdMockD1}`;
      const expectedStatus = 200;

      await Destination.create(destinationsMock);
      await User.create(userMock);

      const response = await request(app)
        .patch(path)
        .set("Authorization", "Bearer token")
        .send({ isVisited: false })
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("destination", {
        ...destinationsMock[0],
        isVisited: true,
      });
    });
  });
});
