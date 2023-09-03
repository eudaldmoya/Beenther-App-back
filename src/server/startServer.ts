import debugCreator from "debug";
import "dotenv/config.js";
import app from "./index.js";

const debug = debugCreator("destinations:server:start");

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(`Listening on http://localhost:${port}`);
  });
};

export default startServer;
