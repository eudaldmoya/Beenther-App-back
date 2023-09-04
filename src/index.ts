import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import connectToDatabase from "./database/connectToDatabase.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.DATABASE_URL!;
const debug = debugCreator("destinations:server:start");

try {
  await connectToDatabase(mongoDbUrl);
  debug(chalk.green("Connected to database"));

  startServer(+port);
} catch (error: unknown) {
  debug(chalk.red("Could not connect to database"));
  debug(chalk.red((error as Error).message));

  process.exit(1);
}
