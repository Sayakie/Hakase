import { LogLevel } from '@sapphire/framework'
import {
  type ArrayString,
  type NumberString,
  envParseArray,
  envParseNumber,
  envParseString,
  setup
} from '@skyra/env-utilities'
import { type ClientOptions, Constants } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import type { RedisOptions } from 'ioredis'
import { URL } from 'node:url'

import { Directories } from '#lib/utils/constants.js'
import { keyMirror } from '#lib/utils/functions.js'

setup(new URL(`.env`, Directories.Root))

const EnvKeys = keyMirror([
  `OWNERS`,

  `CLIENT_PRESENCE_NAME`,
  `CLIENT_PRESENCE_TYPE`,

  `FUZZY_SEARCH_POKEMON_THRESHOLD`,
  `FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD`,

  `DISCORD_TOKEN`,
  // WORKAROUND for GitHub Codespace
  `DISCORD_TOKEN_DEV`,
  `DISCORD_TOKEN_PROD`,

  // Redis
  `REDIS_USERNAME`,
  `REDIS_PASSWORD`,
  `REDIS_HOST`,
  `REDIS_PORT`
])

/* eslint-disable @typescript-eslint/naming-convention */
declare module '@skyra/env-utilities' {
  interface Env {
    NODE_ENV: `development` | `production` | `test`
    [EnvKeys.OWNERS]: ArrayString

    [EnvKeys.CLIENT_PRESENCE_NAME]: string
    [EnvKeys.CLIENT_PRESENCE_TYPE]: string

    [EnvKeys.FUZZY_SEARCH_POKEMON_THRESHOLD]: NumberString
    [EnvKeys.FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD]: NumberString

    [EnvKeys.DISCORD_TOKEN]: string
    [EnvKeys.DISCORD_TOKEN_DEV]: string
    [EnvKeys.DISCORD_TOKEN_PROD]: string

    [EnvKeys.REDIS_HOST]: string
    [EnvKeys.REDIS_PORT]: NumberString
    [EnvKeys.REDIS_USERNAME]: string
    [EnvKeys.REDIS_PASSWORD]: string
  }
}
/* eslint-enable */

export const OWNERS = envParseArray(`OWNERS`, [])

export const DISCORD_TOKEN = isProduction()
  ? envParseString(`DISCORD_TOKEN_PROD`, ``) || envParseString(`DISCORD_TOKEN`)
  : envParseString(`DISCORD_TOKEN_DEV`, ``) || envParseString(`DISCORD_TOKEN`)

export const CLIENT_OPTIONS: ClientOptions = {
  allowedMentions: { roles: [], users: [] },

  intents: [GatewayIntentBits.Guilds],

  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: false,

  logger: {
    level: isProduction() ? LogLevel.Info : LogLevel.Debug
  },

  partials: [Constants.PartialTypes.CHANNEL, Constants.PartialTypes.GUILD_SCHEDULED_EVENT],

  prisma: null
}

export function isProduction(): boolean {
  return envParseString(`NODE_ENV`) === `production`
}

export function parseRedisOption(): RedisOptions {
  return {
    host: envParseString(`REDIS_HOST`, `127.0.0.1`),
    password: envParseString(`REDIS_PASSWORD`, ``),
    port: envParseNumber(`REDIS_PORT`, 6379),
    username: envParseString(`REDIS_USERNAME`, ``)
  }
}
