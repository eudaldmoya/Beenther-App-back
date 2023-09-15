import { type NextFunction, type Request, type Response } from "express";
import Destination from "../../../../database/models/Destination";
import {
  destinationsMock,
  mongooseIdMockD1,
} from "../../../../mocks/destinationsMock";
import { type AuthRequestWithBody } from "../../../types";
import { modifyDestination } from "../destinationsControllers";

describe("Given a getDestinations controller", () => {
  const req: Partial<AuthRequestWithBody> = {
    params: {
      destinationId: mongooseIdMockD1,
    },
    body: {
      name: "Lake Louise",
      description:
        "Lake Louise (named Ho-run-num-nay (Lake of the Little Fishes) by the Stoney Nakota First Nations people) is a glacial lake within Banff National Park in Alberta, Canada. Situated 11 km east of the border with British Columbia, Lake Louise is located 5 km west of the hamlet of Lake Louise and the Trans-Canada Highway. Lake Louise is named after the Princess Louise Caroline Alberta (1848–1939), the fourth daughter of Queen Victoria and the wife of the Marquess of Lorne, who was the Governor General of Canada from 1878 to 1883",
      location: "Alberta",
      country: "Canada",
      horizontalImageUrl: "himage.png",
      verticalImageUrl: "vimage.png",
      isVisited: false,
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  Destination.findByIdAndUpdate = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({
      ...destinationsMock[0],
      isVisited: true,
    }),
  });

  describe("When it receives a request with a destinationId: mongooseIdMockD1 and a destination 'Lake Louise', a response and a next function", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      await modifyDestination(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method should respond with the destination modified", async () => {
      await modifyDestination(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        destination: {
          ...destinationsMock[0],
          isVisited: true,
        },
      });
    });
  });

  describe("when it receives a request without a destinationId, a response and a next function", () => {
    test("Then the next function should be called with 'Could not modify the destination'", async () => {
      const error = new Error();

      Destination.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue({}),
      });

      await modifyDestination(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
