import { resolve } from "node:path";
import { format } from "date-fns";
import { GatewayIntentBits } from "discord-api-types/v10";
import { type ClientOptions, Partials } from "discord.js";
import { Client } from "#lib/client/Client.js";
import { env } from "#lib/env.js";

const isProduction = process.env.NODE_ENV === "production";

const clientOptions: ClientOptions = {
  allowedMentions: { roles: [], users: [] },
  i18n: {
    defaultLanguageDirectory: "./locales",
  },
  intents: [GatewayIntentBits.Guilds],
  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: false,
  logger: {
    pino: {
      level: isProduction ? "info" : "debug",
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
            level: isProduction ? "info" : "debug",
            options: { translateTime: "SYS:yyyy-mm-dd HH:MM:ss" },
            target: "pino-pretty",
          },
        ],
      },
    },
  },

  partials: [Partials.Channel, Partials.GuildScheduledEvent],

  prisma: null,
} satisfies ClientOptions;

let client: Client | null = null;

export async function connect(): Promise<Client> {
  if (client) {
    throw new Error("The client is already connected.");
  }

  client = new Client(clientOptions);
  await client.login(env.DISCORD_TOKEN).catch((reason) => {
    process.exitCode = 1;

    if (client) {
      client.logger.error(reason);
      client.destroy();
      client = null;
    }
  });

  return client;
}
