import type { Interaction, TextChannel } from 'discord.js'
import { Constants, MessageEmbed } from 'discord.js'
import i18next from 'i18next'

import { getConnector } from '@/db/Connector.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'
import { pokeDrops, spawnerConfig, spawnSets } from '@/utils/Constants.js'
import {
  getBaseStats,
  getDrop,
  getEvolutionEntities,
  getEvolutionSpec,
  getPokeDropFromSpecies,
  getSpriteUri
} from '@/utils/PokemonUtil.js'
import { generateWebhookTemplate } from '@/utils/Util.js'

function clientInteractionHandler(client: Client): ListenerCleanup {
  const connector = getConnector()
  const getLocale = connector.prepare(`
    SELECT locale FROM Guild WHERE id = ?
  `)

  async function onInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isButton() || !interaction.inCachedGuild()) return
    if (interaction.deferred) return
    if (!interaction.customId.startsWith('Pixelmon')) return

    const [, speciesStr, type, formInt] = interaction.customId.split('.')
    const species = EnumSpecies.getFromName(speciesStr!)!

    const { locale } = getLocale.get(interaction.guildId)

    if (i18next.language !== locale) {
      await i18next.changeLanguage(locale)
    }

    if (type === 'form') {
      await $form(interaction, species, Number(formInt)).catch(console.error)
    } else if (type === 'dropItem') {
      await $dropItem(interaction, species, Number(formInt)).catch(
        console.error
      )
    } else if (type === 'evolution') {
      await $evolution(interaction, species, Number(formInt)).catch(
        console.error
      )
    }

    await interaction.deferUpdate()
  }

  async function $form(
    interaction: Interaction,
    species: EnumSpecies,
    variant: number
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const bs = getBaseStats(species, variant)!
    const spawnInfos =
      spawnSets.get(bs.pixelmonName.replaceAll('-', '')) ??
      ([{ condition: {}, spec: {} }] as SpawnInfo[])
    const {
      avatarUrl: avatarURL,
      components,
      embed,
      username
    } = generateWebhookTemplate({ bs, spawnInfos, spawnerConfig, variant })

    await webhook.send({
      avatarURL,
      components: components.length > 0 ? components : undefined,
      embeds: [embed],
      username: `${username}`
    })
  }

  async function $dropItem(
    interaction: Interaction,
    species: EnumSpecies,
    variant: number
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const pokeDrop = getPokeDropFromSpecies(pokeDrops, species, variant)!
    const dropInfo = getDrop(pokeDrop)
    const avatarURL = getSpriteUri(species, variant)
    const username = i18next.t('field.drop', {
      '0': species.getLocalizedName()
    })

    const embed = new MessageEmbed().setDescription(dropInfo)

    await webhook.send({
      avatarURL,
      embeds: [embed],
      username: `${username}`
    })
  }

  async function $evolution(
    interaction: Interaction,
    species: EnumSpecies,
    variant: number
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const evolutionSet = new Set<string>()
    const evolutions = getEvolutionEntities(species, variant)
    evolutions
      .map(evolution => `# ${evolution.join(' ━➔ ')}`)
      .forEach(evolutionSet.add, evolutionSet)
    const evolutionSpec = getEvolutionSpec(species, variant)

    if (evolutionSet.size > 0) {
      const avatarURL = getSpriteUri(species, variant)
      const username = i18next.t('field.evolutionEntityOf', {
        '0': species.getLocalizedName()
      })
      const embed = new MessageEmbed().addField(
        ':whale: ' + i18next.t('field.evolutionEntity'),
        [
          '```md',
          [...evolutionSet].filter(phase => phase.includes('━➔')).join('\n'),
          '```'
        ].join('\n')
      )

      if (evolutionSpec !== null) {
        embed.addField(
          ':sparkles: ' + i18next.t('field.evolution'),
          [
            '```cs',
            `${evolutionSpec.map(s => `# ${s}`).join('\n')}`,
            '```'
          ].join('\n')
        )
      }

      await webhook.send({
        avatarURL,
        embeds: [embed],
        username: `${username}`
      })
    }
  }

  client.on(Constants.Events.INTERACTION_CREATE, onInteraction)

  return () => {
    client.off(Constants.Events.INTERACTION_CREATE, onInteraction)
  }
}

Reflect.defineProperty(clientInteractionHandler, 'listeners', {
  value: ['onInteraction']
})

export default clientInteractionHandler
