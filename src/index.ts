import "./lib/setup.js";

import { Client } from "#lib/client/Client.js";
import { CLIENT_OPTIONS, DISCORD_TOKEN } from "#lib/config.js";

const client = new Client(CLIENT_OPTIONS);

await client.login(DISCORD_TOKEN).catch((reason) => {
  process.exitCode = 1;

  client.logger.error(reason);
  client.destroy();
});
