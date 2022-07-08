import { Client } from '@hakase/sapphire-framework'
import { envParseString, setup } from '@skyra/env-utilities'
import { URL } from 'node:url'

import { CLIENT_OPTIONS } from './config.js'

setup(new URL(`.env`, new URL(`../`, import.meta.url)))

const client = new Client(CLIENT_OPTIONS)
await client.login(envParseString(`DISCORD_TOKEN_DEV`)).catch(reason => {
  process.exitCode = 1

  client.logger.error(reason)
  client.destroy()
})
