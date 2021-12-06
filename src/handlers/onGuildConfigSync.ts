import type { Guild } from 'discord.js'
import { Constants } from 'discord.js'

import { getConnector } from '@/db/Connector.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'

function guildConfigSyncHandler(client: Client): ListenerCleanup {
  const connector = getConnector()
  const isExists = connector.prepare(`SELECT * FROM Guild WHERE id = ?`)
  const createGuild = connector.prepare(`
    INSERT INTO Guild VALUES (@id, @prefix, @locale, @tier)
  `)
  const deleteGuild = connector.prepare(`
    DELETE FROM Guild WHERE id = ?
  `)
  const deleteChannel = connector.prepare(`
    DELETE FROM Channel WHERE id = ?
  `)

  async function onReady(): Promise<void> {
    client.guilds.cache.forEach(async guild => {
      if (!isExists.get(guild.id)) {
        createGuild.run({
          id: guild.id,
          locale: guild.preferredLocale,
          prefix: '!',
          tier: 1
        })
      }
    })
  }

  async function onGuildCreate(guild: Guild): Promise<void> {
    if (!isExists.get(guild.id)) {
      createGuild.run({
        id: guild.id,
        locale: guild.preferredLocale,
        prefix: '!',
        tier: 1
      })
    }
  }

  async function onGuildDelete(guild: Guild): Promise<void> {
    if (isExists.get(guild.id)) {
      deleteGuild.run(guild.id)
      deleteChannel.run(guild.id)
    }
  }

  client.on(Constants.Events.CLIENT_READY, onReady)
  client.on(Constants.Events.GUILD_CREATE, onGuildCreate)
  client.on(Constants.Events.GUILD_DELETE, onGuildDelete)

  return () => {
    client.off(Constants.Events.CLIENT_READY, onReady)
    client.off(Constants.Events.GUILD_CREATE, onGuildCreate)
    client.off(Constants.Events.GUILD_DELETE, onGuildDelete)
  }
}

Reflect.defineProperty(guildConfigSyncHandler, 'listeners', {
  value: ['onReady', 'onGuildCreate', 'onGuildDelete']
})

export default guildConfigSyncHandler
