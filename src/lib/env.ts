import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  runtimeEnv: process.env,
  server: {
    CLIENT_PRESENCE_NAME: z.string().optional(),
    CLIENT_PRESENCE_TYPE: z.string().optional(),
    DISCORD_TOKEN: z.string({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      required_error: "`DISCORD_TOKEN` is required.",
    }),
    DISCORD_TOKEN_DEV: z.string().optional(),
    DISCORD_TOKEN_PROD: z.string().optional(),
    FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD: z.coerce
      .number()
      .default(0.3),
    FUZZY_SEARCH_POKEMON_THRESHOLD: z.coerce.number().default(0.125),
    NODE_ENV: z
      .enum(["development", "production"])
      .or(z.string())
      .default("development"),
    OWNERS: z.preprocess(
      (it) => z.string().parse(it).split(/,\s+/),
      z.array(z.string()).default([]),
    ),
  },
});
