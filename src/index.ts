import { Intents, Options } from 'discord.js'
import { config } from 'dotenv'
import { join } from 'node:path'
import pico from 'picocolors'

import { Client } from '@/structures/Client.js'
import { SourceDirectory } from '@/utils/Constants.js'

function harmonyTerminator(error: Error | string): void {
  error = error instanceof Error ? error : new Error(error)

  console.log(error)
  process.exitCode = 1
}

const signals: ReadonlyArray<NodeJS.Signals> = ['SIGINT', 'SIGTERM']
function signalHandler(signal: NodeJS.Signals): void {
  signals.forEach(signal => process.off(signal, signalHandler))

  try {
    console.log(`Received Signal<${signal}>`)
    client.destroy()
  } catch {
    process.exitCode = 1
  } finally {
    clearInterval(attachInterval.timeoutId!)
  }
}

signals.forEach(signal => process.once(signal, signalHandler))

// Handle unhandled exceptions or rejection from Promise.
process.on('uncaughtException', error => {
  console.log(pico.red('Uncaught exception occured!'))
  console.error(error)
})

config()

const client = new Client({
  commandsPath: join(SourceDirectory, 'commands'),
  handlersPath: join(SourceDirectory, 'handlers'),
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  interactionsPath: join(SourceDirectory, 'interactions'),
  makeCache: Options.cacheWithLimits({
    /* eslint-disable @typescript-eslint/naming-convention */
    BaseGuildEmojiManager: 0,
    GuildBanManager: 0,
    GuildEmojiManager: 0,
    GuildInviteManager: 0,
    GuildStickerManager: 0,
    MessageManager: {
      maxSize: 200,
      sweepInterval: 600 // 10 mins
    },
    PresenceManager: 0,
    ReactionManager: 0,
    ReactionUserManager: 0,
    StageInstanceManager: 0,
    ThreadManager: 0,
    ThreadMemberManager: 0,
    VoiceStateManager: 0
    /* eslint-enable */
  }),
  // partials: [
  //   Constants.PartialTypes.MESSAGE,
  //   Constants.PartialTypes.GUILD_MEMBER
  // ],
  retryLimit: 10
})

function attachInterval(): void {
  attachInterval.timeoutId = setInterval(() => {
    const content =
      `Serving ${client.users.cache.size} users ` +
      `from ${client.guilds.cache.size} guilds.`

    console.log(pico.blue('[INFO]'), content)

    if (client.isReady()) {
      const channel = client.channels.cache.get('854304218223214602')
      if (channel?.isText()) {
        void channel.send({ content }).catch()
      }
    }
  }, 2 * 60 * 1000 /** 2 minutes */)
}

attachInterval.timeoutId = undefined as NodeJS.Timeout | undefined

await client.init().catch(harmonyTerminator)
await client.login().then(attachInterval).catch(harmonyTerminator)
