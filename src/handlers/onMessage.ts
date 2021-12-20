import type { Message, TextChannel } from 'discord.js'
import { Constants, MessageEmbed, Permissions } from 'discord.js'
import i18next from 'i18next'
import { getPhonemes, getRegExp } from 'korean-regexp'

import { getConnector } from '@/db/Connector.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'
import { spawnerConfig, spawnSets } from '@/utils/Constants.js'
import { getBaseStats } from '@/utils/PokemonUtil.js'
import { generateWebhookTemplate } from '@/utils/Util.js'

function clientReceivedMessageHandler(client: Client): ListenerCleanup {
  const connector = getConnector()
  const getGuildConfig = connector.prepare(`
    SELECT prefix, locale FROM Guild WHERE id = ?
  `)

  // TODO I know it messed up
  const Locale = ['en-US', 'ko'] as Locale[]

  async function onMessageCreate(message: Message): Promise<void> {
    // Aborts incoming from system
    if (message.system || message.author.system) return

    // Aborts incoming from DM
    if (!message.guild) return

    // Aborts bot
    if (message.author.bot) return

    // Aborts myself
    if (message.author.equals(client.user)) return

    // Aborts reference message
    if (message.reference) return

    const { prefix, locale } = getGuildConfig.get(message.guildId!)

    if (!message.cleanContent.startsWith(prefix)) return

    const CommandArguments = message.content
      .substring(prefix.length)
      .trim()
      .split(/\s+/g)
    const CommandToken = CommandArguments.shift()?.toLowerCase()

    if (i18next.language !== locale) {
      await i18next.changeLanguage(locale)
    }

    switch (CommandToken) {
      case 'setprefix':
      case '접두사설정': {
        if (
          !message.member!.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
        ) {
          return
        }

        const args = CommandArguments.join(' ')

        connector
          .prepare(`UPDATE Guild SET prefix = @prefix WHERE ID = @id`)
          .run({
            id: message.guildId!,
            prefix: args
          })
        await message.channel.send('```diff\n+ ✔ Done!\n```')
        break
      }
      case 'setlang':
      case '언어설정': {
        if (
          !message.member!.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
        ) {
          return
        }

        const args = CommandArguments.join(' ') as Locale
        if (!Locale.includes(args)) {
          await message.channel.send(
            '```diff\n- ✖ Invalid language! Type en-US or ko\n```'
          )
          return
        }

        connector
          .prepare(`UPDATE Guild SET locale = @locale WHERE ID = @id`)
          .run({
            id: message.guildId!,
            locale: args
          })
        await message.channel.send('```diff\n+ ✔ Done!\n```')
        break
      }
      case 'setchannel':
      case '채널설정': {
        if (
          !message.member!.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
        ) {
          return
        }

        const webhooks = await (message.channel as TextChannel).fetchWebhooks()
        let webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

        if (!webhook) {
          webhook = await (message.channel as TextChannel).createWebhook(
            'HakasePokedex',
            { avatar: client.user.avatarURL() as string }
          )

          await message.channel.send('```diff\n+ ✔ Connected!\n```')
        } else {
          await message.channel.send('```diff\n- ⚠ Already connected!\n```')
        }
        break
      }
      case 'pokemon':
      case '포켓몬': {
        const webhooks = await (message.channel as TextChannel).fetchWebhooks()
        let webhook = webhooks.find(webhook => webhook.name === 'HakasePokedex')

        if (!webhook) {
          if (webhooks.some(({ name }) => name === 'Izuna Pokedex')) {
            webhook = await (message.channel as TextChannel).createWebhook(
              'HakasePokedex',
              { avatar: client.user.avatarURL() as string }
            )
          }
        }

        if (!webhook) return

        const args = CommandArguments.join(' ')
        const species = EnumSpecies.getFromName(args)

        if (!species) {
          const embed = new MessageEmbed()
          const pokemonSet = [...EnumSpecies.PokemonSet.values()]
          const relatedMatchSet = pokemonSet.filter(pokemon =>
            getRegExp(pokemon.getLocalizedName(), {
              fuzzy: true,
              global: true,
              ignoreCase: true,
              ignoreSpace: true,
              initialSearch: true
            }).test(args)
          )

          if (relatedMatchSet.length === 0) {
            relatedMatchSet.push(
              ...pokemonSet.filter(pokemon =>
                getRegExp(
                  pokemon
                    .getLocalizedName()
                    .split(``)
                    .map(v => getPhonemes(v).initial)
                    .join(``)
                ).test(args)
              )
            )
          }

          if (relatedMatchSet.length === 0) {
            embed
              .setColor('#F52831')
              .setDescription(
                `:loudspeaker: ` + i18next.t(`Misc:pokemon.notFound`)
              )
          } else {
            let relatedMatches = relatedMatchSet
              .map(species => species.getLocalizedName())
              .join(', ')

            if (relatedMatches.length > 1000) {
              relatedMatches =
                relatedMatches.substring(
                  0,
                  relatedMatches.lastIndexOf(',') - 1
                ) + '...'
            }

            embed
              .setColor('#F5605C')
              .setDescription(
                i18next.t(`Misc:pokemon.findSimilar`) +
                  '```fix\n' +
                  relatedMatches +
                  '\n```'
              )
          }

          await message.reply({
            allowedMentions: { users: [] },
            embeds: [embed]
          })
          return
        }

        const bs = getBaseStats(species)!
        const spawnInfos =
          spawnSets.get(bs.pixelmonName.replaceAll('-', '')) ??
          ([{ condition: {}, spec: {} }] as SpawnInfo[])
        const {
          avatarUrl: avatarURL,
          components,
          embed,
          username
        } = generateWebhookTemplate({ bs, spawnInfos, spawnerConfig })

        await webhook
          .send({
            avatarURL,
            components: components.length > 0 ? components : undefined,
            embeds: [embed],
            username: `${username}`
          })
          .catch(console.error)
        break
      }
      default:
        break
    }
  }

  client.on(Constants.Events.MESSAGE_CREATE, onMessageCreate)

  return () => {
    client.off(Constants.Events.MESSAGE_CREATE, onMessageCreate)
  }
}

Reflect.defineProperty(clientReceivedMessageHandler, 'listeners', {
  value: ['onMessageCreate']
})

export default clientReceivedMessageHandler
