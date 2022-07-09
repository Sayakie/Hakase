import { LogLevel } from '@sapphire/framework'
import type { NumberString } from '@skyra/env-utilities'
import { type ArrayString, type BooleanString, envParseString, setup } from '@skyra/env-utilities'
import { type ClientOptions, Constants } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import { URL } from 'node:url'

<<<<<<< HEAD:src/lib/config.ts
import { Directories } from './utils/constants.js'
import { keyMirror } from './utils/functions.js'
=======
import { keyMirror } from './lib/utils/functions.js'
>>>>>>> 017f803 (refactor: reposition project working dir):src/config.ts

setup(new URL(`.env`, Directories.Root))

const EnvKeys = keyMirror([
  `OWNERS`,

  `CLIENT_PRESENCE_NAME`,
  `CLIENT_PRESENCE_TYPE`,

  `FUZZY_SEARCH_POKEMON_THRESHOLD`,
  `FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD`,

  `DISCORD_TOKEN`,
  // [for Codespace only]
  `DISCORD_TOKEN_DEV`,
  `DISCORD_TOKEN_PROD`
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
  }
}
/* eslint-enable */

export const OWNERS = envParseString(`OWNERS`)

export const DISCORD_TOKEN =
  envParseString(`NODE_ENV`) === `production`
    ? envParseString(`DISCORD_TOKEN_PROD`) || envParseString(`DISCORD_TOKEN`)
    : envParseString(`DISCORD_TOKEN_DEV`) || envParseString(`DISCORD_TOKEN`)

export const CLIENT_OPTIONS: ClientOptions = {
  allowedMentions: { roles: [], users: [] },

  intents: [GatewayIntentBits.Guilds],

  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: false,

<<<<<<< HEAD:src/lib/config.ts
  logger: {
    level: envParseString(`NODE_ENV`) === `production` ? LogLevel.Info : LogLevel.Debug
  },

  partials: [Constants.PartialTypes.CHANNEL, Constants.PartialTypes.GUILD_SCHEDULED_EVENT],

  prisma: null
=======
  partials: [Constants.PartialTypes.CHANNEL, Constants.PartialTypes.GUILD_SCHEDULED_EVENT]
>>>>>>> 017f803 (refactor: reposition project working dir):src/config.ts
}
