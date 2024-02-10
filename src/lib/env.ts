import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  runtimeEnv: process.env,
  server: {
    CLIENT_PRESENCE_NAME: z.string(),
    CLIENT_PRESENCE_TYPE: z.string(),
    DISCORD_TOKEN: z.string(),
    DISCORD_TOKEN_DEV: z.string(),
    DISCORD_TOKEN_PROD: z.string(),
    FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD: z.number(),
    FUZZY_SEARCH_POKEMON_THRESHOLD: z.number(),
    NODE_ENV: z.string(),
    OWNERS: z.array(z.string()),
  },
});
