import { Intents, Options } from 'discord.js'
import type { DotenvConfigOutput } from 'dotenv'
import { config } from 'dotenv'
import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import pico from 'picocolors'

import { Client } from '@/structures/Client.js'
import {
  DataDirectory,
  emojis,
  RootDirectory,
  SourceDirectory
} from '@/utils/Constants.js'
import { Locale } from '@/utils/I18n.js'
import { walk } from '@/utils/Util.js'

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

const { NODE_ENV = 'production' } = process.env
await Promise.all(
  ['.env', `.env.${NODE_ENV.toLowerCase()}`].map(
    async file =>
      await access(join(RootDirectory, file))
        .then(() => file)
        .catch(() => null)
  )
)
  .then(unrefinedFiles => unrefinedFiles.filter(Boolean).map(String))
  .then(files =>
    files.map(
      file =>
        [file, config({ path: join(RootDirectory, file) })] as [
          string,
          DotenvConfigOutput
        ]
    )
  )
  .then(components => {
    components
      .filter(([, { error }]) => Boolean(error))
      .forEach(([file, { error }], i, { length }) => {
        console.log(
          pico.red(`Failed to load environment variables from ${file}!`),
          error
        )

        if (i === length - 1) {
          throw error
        }
      })
  })

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

await client
  .init()
  .then(async () => {
    const emojiPathList = walk(join(DataDirectory, 'emoji'), {
      globs: ['**/*.json']
    })

    for await (const emojiPath of emojiPathList) {
      const emojiSetBuf = await readFile(emojiPath)
      const emojiSet = JSON.parse(emojiSetBuf.toString())

      Object.keys(emojiSet).forEach(emoji => {
        const emojiSnowflake = emojiSet[emoji]
        emojis[emoji] = `<:${emoji}:${emojiSnowflake}>`
      })
    }
  })
  .then(async () => {
    const locale = Locale.getInstance()

    await locale.init().catch()
  })
  .catch(harmonyTerminator)
await client.login().then(attachInterval).catch(harmonyTerminator)
