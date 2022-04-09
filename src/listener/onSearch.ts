import type { Interaction } from 'discord.js'

import { Species } from '../entity/Species.js'
import { searchCommand } from '../interaction/command/search.js'
import { defaultSpawnInfos, Events } from '../util/Constant.js'
import { spawnerConfig, spawnSetMap, statLink } from '../util/DataManager.js'
import { generateBaseEmbed } from '../util/function.js'
import type { Handlers } from './Listener.js'

async function onSearch(interaction: Interaction): Promise<void> {
  if (!(interaction.isCommand() && interaction.inGuild())) return

  const { commandName } = interaction
  if (commandName.toLowerCase() === searchCommand.name.toLowerCase()) {
    const species = Species.getFromName(
      interaction.options.getString(`pokemon`, true)
    )

    if (species === null || !statLink.has(species)) {
      await interaction.reply({
        content: 'No pokemon found.',
        ephemeral: true
      })
      return
    }

    const stat = statLink.get(species)!
    const spawnInfos =
      spawnSetMap.get(stat.pixelmonName.replaceAll(`-`, ``)) ??
      defaultSpawnInfos
    const { components, embeds } = generateBaseEmbed({
      spawnInfos,
      spawnerConfig,
      stat
    })
    await interaction.reply({ components, embeds })
  }
}

export const handlers: Handlers = [[Events.INTERACTION_CREATE, onSearch]]
