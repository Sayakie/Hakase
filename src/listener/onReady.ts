import { setTimeout as wait } from 'node:timers/promises'
import pico from 'picocolors'

import type { Client } from '../Client.js'
import { createCommand } from '../interaction/command.js'
import { searchCommand } from '../interaction/command/search.js'
import { Events } from '../util/Constant.js'

function printLoggedInWith(client: Client<true>): void {
  console.log(`Logged in as ${pico.green(client.user.tag)}`)
}

async function registerDefaultSlashCommands(
  client: Client<true>
): Promise<void> {
  await wait(2_000)

  client.guilds.cache.forEach(guild => {
    createCommand(client, guild.id, searchCommand)
  })
}

export const handlers = [
  [Events.CLIENT_READY, printLoggedInWith]
  // [Events.CLIENT_READY, registerDefaultSlashCommands]
]
