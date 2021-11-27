import type { Message, TextChannel } from 'discord.js'
import { Constants, MessageEmbed, Permissions } from 'discord.js'
import i18next from 'i18next'
import { getRegExp } from 'korean-regexp'

import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'
import { PokemonUtil } from '@/utils/PokemonUtil.js'

function clientReceivedMessageHandler(client: Client): ListenerCleanup {
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

    const guildConfigs = await client.guildConfigs.get(message.guildId!)
    const { prefix, locale } = guildConfigs ?? client.static.defaultGuildConfig

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
        await client.guildConfigs.set(message.guildId!, {
          ...(guildConfigs ?? client.static.defaultGuildConfig),
          ...{ locale: args }
        })
        await message.channel.send('```diff\n+ ✔ Done!\n```')
        break
      }
      case 'setch':
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
          const relatedMatchSet = [...EnumSpecies.PokemonSet.values()].filter(
            pokemon =>
              getRegExp(args, {
                fuzzy: true,
                global: true,
                ignoreCase: true,
                ignoreSpace: true,
                initialSearch: true
              }).test(pokemon.getLocalizedName())
          )

          if (relatedMatchSet.length === 0) {
            embed
              .setColor('#F52831')
              .setDescription(':loudspeaker: 찾은 포켓몬이 없습니다!')
          } else {
            embed
              .setColor('#F5605C')
              .setDescription(
                '비슷한 포켓몬을 찾았습니다.' +
                  '```fix\n' +
                  relatedMatchSet
                    .map(species => species.getLocalizedName())
                    .join(', ') +
                  '\n```'
              )
          }

          await message.reply({
            allowedMentions: { users: [] },
            embeds: [embed]
          })
          return
        }

        const baseStats = PokemonUtil.getBaseStats(species)
        const {
          avatarUrl: avatarURL,
          components,
          embed,
          username
        } = PokemonUtil.generateWebhookTemplate(baseStats)

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
