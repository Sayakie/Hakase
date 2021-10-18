import type { Guild } from 'discord.js'
import { Constants } from 'discord.js'
import pico from 'picocolors'
import semver from 'semver'

import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'

function guildConfigSyncHandler(client: Client): ListenerCleanup {
  const genericPrefix = pico.bold('[EVENT]')
  const guildCreatePrefix = pico.blue(`${genericPrefix} GuildCreate`)
  const guildDeletePrefix = pico.blue(`${genericPrefix} GuildDelete`)

  async function onReady(): Promise<void> {
    client.guilds.cache.forEach(async guild => {
      const guildConfig = await client.guildConfigs.get(guild.id)

      if (!guildConfig) {
        await $CreateGuildConfig(guild)
      } else if (
        semver.gt(client.static.defaultGuildConfig.version, guildConfig.version)
      ) {
        await $RenewalGuildConfig(guild)
      }
    })
  }

  async function onGuildCreate(guild: Guild): Promise<void> {
    const guildInfo = `Guild<${guild.name}#${guild.id}>`
    console.log(guildCreatePrefix, guildInfo)

    const guildConfig = await client.guildConfigs.get(guild.id)

    if (!guildConfig) {
      await $CreateGuildConfig(guild)
    }
  }

  async function onGuildDelete(guild: Guild): Promise<void> {
    const guildInfo = `Guild<${guild.name}#${guild.id}>`
    console.log(guildDeletePrefix, guildInfo)

    const guildConfig = await client.guildConfigs.get(guild.id)

    if (guildConfig) {
      await $DeleteGuildConfig(guild)
    }
  }

  async function $CreateGuildConfig(guild: Guild): Promise<void> {
    const guildInfo = `Guild<${guild.name}#${guild.id}>`
    await client.guildConfigs.set(guild.id, client.static.defaultGuildConfig)

    console.log(`Successfully created a guild config for ${guildInfo}`)
  }

  async function $DeleteGuildConfig(guild: Guild): Promise<void> {
    const guildInfo = `Guild<${guild.name}#${guild.id}>`
    await client.guildConfigs.delete(guild.id)

    console.log(`Successfully deleted a guild config for ${guildInfo}`)
  }

  async function $RenewalGuildConfig(guild: Guild): Promise<void> {
    const guildInfo = `Guild<${guild.name}#${guild.id}>`
    const guildConfig = await client.guildConfigs.get(guild.id)!
    await client.guildConfigs.set(
      guild.id,
      Object.assign({}, client.static.defaultGuildConfig, guildConfig)
    )

    console.log(`Successfully renewaled a guild config for ${guildInfo}`)
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
