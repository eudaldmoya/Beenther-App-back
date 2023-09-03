import chalk from "chalk";
import debugCreator from "debug";
import "dotenv/config";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const debug = debugCreator("destinations:server:start");

try {
  startServer(+port);
} catch (error: unknown) {
  debug(chalk.red((error as Error).message));
}
