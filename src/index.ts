import { setup } from "#lib/setup.js";

import { resolve } from "node:path";
import { format } from "date-fns";
import { GatewayIntentBits } from "discord-api-types/v10";
import { type ClientOptions, Partials } from "discord.js";
import { Client } from "#lib/client/Client.js";
import { env } from "#lib/env.js";
import * as Log from "#lib/output/log.js";

const isForcedSlient =
  "FORCE_SILENT" in process.env || process.argv.includes("--slient");
// eslint-disable-next-line @typescript-eslint/naming-convention
const slient = isForcedSlient || env.NODE_ENV === "production";

await setup({ slient });
Log.trace("Environment loaded.");

const CLIENT_OPTIONS: ClientOptions = {
  allowedMentions: { roles: [], users: [] },
  i18n: {
    defaultLanguageDirectory: import.meta.resolve("../locales"),
  },
  intents: [GatewayIntentBits.Guilds],
  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: false,
  logger: {
    pino: {
      level: env.NODE_ENV === "production" ? "info" : "debug",
      timestamp: true,
      transport: {
        targets: [
          {
            level: "info",
            options: {
              destination: resolve(
                import.meta.resolve("../"),
                "logs",
                `${format(new Date(), "yyyy-MM-dd")}.log`,
              ),
            },
            target: "pino/file",
          },
          {
            level: env.NODE_ENV === "production" ? "info" : "debug",
            options: { translateTime: "SYS:yyyy-mm-dd HH:MM:ss" },
            target: "pino-pretty",
          },
        ],
      },
    },
  },

  partials: [Partials.Channel, Partials.GuildScheduledEvent],

  prisma: null,
};
const client = new Client(CLIENT_OPTIONS);

await client.login(env.DISCORD_TOKEN).catch((reason) => {
  process.exitCode = 1;

  client.logger.error(reason);
  client.destroy();
});
