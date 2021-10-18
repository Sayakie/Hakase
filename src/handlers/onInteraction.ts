import type { Interaction, TextChannel } from 'discord.js'
import { Constants, MessageEmbed } from 'discord.js'
import i18next from 'i18next'

import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'
import { PokemonUtil } from '@/utils/PokemonUtil.js'

function clientInteractionHandler(client: Client): ListenerCleanup {
  async function onInteraction(interaction: Interaction): Promise<void> {
    if (!interaction.isButton() || !interaction.inCachedGuild()) return
    if (interaction.deferred) return
    if (!interaction.customId.startsWith('Pixelmon')) return

    const [, speciesStr, type, formInt] = interaction.customId.split('.')
    const species = EnumSpecies.getFromName(speciesStr!)!

    const guildConfigs = await client.guildConfigs.get(interaction.guildId)
    const { locale } = guildConfigs ?? client.static.defaultGuildConfig

    if (i18next.language !== locale) {
      await i18next.changeLanguage(locale)
    }

    if (type === 'form') {
      await $form(interaction, species, Number(formInt)).catch(console.error)
    } else if (type === 'dropItem') {
      await $dropItem(interaction, species, Number(formInt)).catch(
        console.error
      )
    }

    await interaction.deferUpdate()
  }

  async function $form(
    interaction: Interaction,
    species: EnumSpecies,
    form: number
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const baseStats = PokemonUtil.getBaseStats(species, form)
    const {
      avatarUrl: avatarURL,
      components,
      embed,
      username
    } = PokemonUtil.generateWebhookTemplate(baseStats, form)

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
    form: number
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const baseStats = PokemonUtil.getBaseStats(species, form)
    const dropInfo = PokemonUtil.getDrop(species, form)
    const { avatarUrl: avatarURL, username } =
      PokemonUtil.generateWebhookTemplate(baseStats, form)

    const embed = new MessageEmbed().addField(
      ':meat_on_bone: 드롭 아이템',
      dropInfo
    )

    await webhook.send({
      avatarURL,
      embeds: [embed],
      username: `${username}`
    })
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
