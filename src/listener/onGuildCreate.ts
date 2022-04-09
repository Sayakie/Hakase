import type { Guild } from 'discord.js'
import pico from 'picocolors'

import type { Client } from '../Client.js'
import { createCommand } from '../interaction/command.js'
import { searchCommand } from '../interaction/command/search.js'
import { Events } from '../util/Constant.js'

export function onGuildCreate(client: Client<true>): () => void {
  async function onGuildCreate(guild: Guild): Promise<void> {
    console.log(`Joined guild ${pico.green(`${guild.name}#${guild.id}`)}`)

    await createCommand(client, guild.id, searchCommand)
      .then(() => console.log(`  Created command ${pico.green(`search`)}`))
      .catch(() =>
        console.log(`  Failed to create command ${pico.red(`search`)}`)
      )
  }

  client.subscribe(Events.GUILD_CREATE, onGuildCreate)
  return () => {
    client.unsubscribe(Events.GUILD_CREATE, onGuildCreate)
  }
}
