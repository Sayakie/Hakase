import { type ArrayString, type BooleanString, envParseString, setup } from '@skyra/env-utilities'
import { type ClientOptions, Constants } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import { URL } from 'node:url'

import { keyMirror } from './utils/functions.js'

setup(new URL(`.env`, new URL(`../`, import.meta.url)))

const EnvKeys = keyMirror([
  `OWNERS`,

  `CLIENT_PRESENCE_NAME`,
  `CLIENT_PRESENCE_TYPE`,

  `COMMAND_PREFIX`,
  `ENABLE_MENTION_PREFIX`,

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

    [EnvKeys.COMMAND_PREFIX]: string
    [EnvKeys.ENABLE_MENTION_PREFIX]: BooleanString

    [EnvKeys.DISCORD_TOKEN]: string
    [EnvKeys.DISCORD_TOKEN_DEV]: string
    [EnvKeys.DISCORD_TOKEN_PROD]: string
  }
}
/* eslint-enable */

export const OWNERS = envParseString(`OWNERS`)

export const DISCORD_TOKEN =
  envParseString(`DISCORD_TOKEN_DEV`) ||
  envParseString(`DISCORD_TOKEN_PROD`) ||
  envParseString(`DISCORD_TOKEN`)

export const CLIENT_OPTIONS: ClientOptions = {
  allowedMentions: { roles: [], users: [] },

  intents: [GatewayIntentBits.Guilds],

  loadDefaultErrorListeners: true,
  loadMessageCommandListeners: false,

  partials: [Constants.PartialTypes.CHANNEL, Constants.PartialTypes.GUILD_SCHEDULED_EVENT],

  prisma: null
}
