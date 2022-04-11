import type { Interaction } from 'discord.js'

import { Species } from '../enum/Species.js'
import { defaultSpawnInfos, Events } from '../util/Constant.js'
import { spawnerConfig, spawnSetMap, statLink } from '../util/DataManager.js'
import { generateBaseEmbed } from '../util/function.js'
import type { Handlers } from './Listener.js'

async function onInteraction(interaction: Interaction): Promise<void> {
  if (!(interaction.isButton() && interaction.inGuild())) return
  if (!interaction.customId.startsWith(`Pixelmon-Hakase`)) return
  await interaction.deferReply()

  const [, speciesString, type, variantString, ...data]: [
    `Pixelmon-Hakase`,
    string,
    `form`,
    string,
    ...string[]
  ] = interaction.customId.split(`.`)
  const species = Species.getFromName(speciesString)
  if (!species) {
    await interaction.editReply(`Unknown species: ${speciesString}`)
    return
  }

  const variant = Number(variantString)
  const stat = statLink.get(species)!
  const spawnInfos = spawnSetMap.get(species.getName()) ?? defaultSpawnInfos
  const { components, embeds } = generateBaseEmbed({
    spawnInfos,
    spawnerConfig,
    stat,
    variant: Number(variant)
  })
  await interaction.editReply({ components, embeds })
}

export const handlers: Handlers = [[Events.INTERACTION_CREATE, onInteraction]]
