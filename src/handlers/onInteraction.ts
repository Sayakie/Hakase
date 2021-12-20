import type { Interaction, TextChannel } from 'discord.js'
import { Constants, MessageEmbed, Util } from 'discord.js'
import i18next from 'i18next'

import { getConnector } from '@/db/Connector.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'
import { emojis, spawnerConfig, spawnSets } from '@/utils/Constants.js'
import {
  getBaseStats,
  getDrop,
  getEvolutionEntities,
  getEvolutionSpec,
  getMove,
  getPokeDropFromSpecies,
  getPokemonName,
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

    const [, speciesStr, type, formInt, ...data] =
      interaction.customId.split('.')
    const species = EnumSpecies.getFromName(speciesStr!)!

    const { locale } = getLocale.get(interaction.guildId)

    if (i18next.language !== locale) {
      await i18next.changeLanguage(locale)
    }

    if (type === 'form') {
      await $form(interaction, species, Number(formInt)).catch(console.error)
    } else if (type === 'details') {
      await $details(interaction, species, Number(formInt), data).catch(
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

  async function $details(
    interaction: Interaction,
    species: EnumSpecies,
    variant: number,
    data: string[]
  ): Promise<void> {
    const webhooks = await (interaction.channel as TextChannel).fetchWebhooks()
    const webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

    if (!webhook) {
      return
    }

    const embed = new MessageEmbed()

    const bs = getBaseStats(species, variant)!
    const { malePercent = -1 } = bs
    const genderText =
      malePercent === -1
        ? i18next.t(`Pixelmon:generic.form.none`)
        : // eslint-disable-next-line no-irregular-whitespace
          `​  :male_sign: ${malePercent}% :female_sign: ${100 - malePercent}%`
    const evYields = (Object.keys(bs.evYields) as Stat[]).map(
      stat => `${stat}: ${bs.evYields[stat]}`
    )
    embed.addField(
      `:family_man_girl: ` + i18next.t(`field.genderPercent`),
      genderText,
      true
    )

    if (evYields.length > 0) {
      embed.addField(
        `:muscle: ` + i18next.t(`field.evYields`),
        evYields.join(', '),
        true
      )
    }

    //#region Evolution region
    if (data.includes(`Evolution`)) {
      const evolutionSet = new Set<string>()
      const evolutions = getEvolutionEntities(species, variant)
      evolutions
        .map(evolution => `# ${evolution.join(' ━➔ ')} `)
        .forEach(evolutionSet.add, evolutionSet)
      const evolutionSpec = getEvolutionSpec(species, variant)

      if (evolutionSet.size > 0) {
        const title = i18next.t(`field.evolutionEntity`)

        embed.addField(
          `:whale: ${title}`,
          [
            '```md',
            [...evolutionSet].filter(phase => phase.includes('━➔')).join('\n'),
            '```'
          ].join('\n')
        )
      }

      if (evolutionSpec !== null && evolutionSpec.length > 0) {
        const title = i18next.t(`field.evolutionSpec`)

        embed.addField(
          `:sparkles: ${title}`,
          [
            '```cs',
            `${evolutionSpec.map(s => `# ${s}`).join('\n')}`,
            '```'
          ].join('\n')
        )
      }
    }
    //#endregion

    //#region PokeDrop region
    if (data.includes(`PokeDrop`)) {
      const drops = getPokeDropFromSpecies(species, variant)!
      const title = i18next.t(`field.drops`)
      const dropInfo = getDrop(drops)

      embed.addField(`:gem: ${title}`, dropInfo)
    }
    //#endregion

    //#region Move region
    if (data.includes(`Move`)) {
      const moves = getMove(species, variant)!
      if (moves.tr) {
        embed.addField(':cd: ' + i18next.t('field.tr'), moves.tr, false)
      }

      Util
      if (moves.tm && moves.tm.length < 1000) {
        embed.addField(':minidisc: ' + i18next.t('field.tm'), moves.tm, false)
      }

      if (moves.tutor) {
        embed.addField(
          emojis['heart_scale'] + ' ' + i18next.t('field.tutor'),
          moves.tutor,
          false
        )
      }

      if (moves.levelUp) {
        embed.addField(
          ':rosette: ' + i18next.t('field.levelUp'),
          moves.levelUp,
          false
        )
      }
    }
    // //#endregion

    const avatarURL = getSpriteUri(species, variant)
    const username = getPokemonName(bs, variant)

    await webhook.send({
      avatarURL,
      embeds: [embed],
      username: `${username}(#${species.getNationalPokedexNumber()})`
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
