import type { ClientOptions as DiscordClientOptions } from 'discord.js'
import { Client as DiscordJSClient } from 'discord.js'
import Keyv from 'keyv'
import { KeyvFile } from 'keyv-file'
import { readFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

import { getConnector, setup } from '@/db/Connector.js'
import type { ListenerStruct } from '@/handlers/Listener.js'
import {
  ClientStatus,
  ConfigDirectory,
  RootDirectory
} from '@/utils/Constants.js'
import { Locale } from '@/utils/I18n.js'
import { PokemonUtil } from '@/utils/PokemonUtil.js'
import { Util } from '@/utils/Util.js'

type ArtifactPaths = 'commandsPath' | 'interactionsPath' | 'handlersPath'

function getPackageVersion(): string {
  try {
    const { version } = JSON.parse(
      readFileSync(`${RootDirectory}/package.json`).toString()
    ) as {
      version: string
    }

    return version
  } catch {
    return 'Unknown'
  }
}

/**
 * Represents an options for a {@link Client}.
 *
 * @interface
 * @extends {DiscordClientOptions}
 */
export type ClientOptions = DiscordClientOptions & {
  [P in ArtifactPaths]: string
}

/**
 * Represents PixelPokedex, a Discord bot client extending {@link DiscordJSClient}
 * offers enhanced features, exposes useful methods and stores configs per
 * {@link Guild}s.
 *
 * @class
 * @extends {DiscordJSClient<true>}
 */
export class Client extends DiscordJSClient<true> {
  /**
   * Represents default options for a {@link Client}.
   *
   * @readonly
   * @type {Partial<ClientOptions>}
   */
  public static readonly defaultOptions: Partial<ClientOptions> = {
    retryLimit: 10
  }

  /**
   * Represents default guild config.
   *
   * @readonly
   * @type {GuildConfig}
   */
  public static readonly defaultGuildConfig: GuildConfig = {
    channels: [],
    locale: 'en-US',
    prefix: '!',
    version: '0.3.1'
  }

  /**
   * The guild config set.
   *
   * @readonly
   * @type {Keyv<GuildConfig>}
   */
  public readonly guildConfigs: Keyv<GuildConfig>

  /**
   * The commands that have been registered by the {@link Client}.
   *
   * @readonly
   * @type {Map<string, Command>}
   */
  public readonly commands: Map<string, unknown>

  /**
   * The interactions that have been registered by the {@link Client}.
   * It includes slash commands and/or context menus.
   *
   * @readonly
   * @type {Map<string, unknown>}
   */
  public readonly interactions: Map<string, unknown>

  /**
   * The cleanup handlers that have been registered by the {@link Client}.
   * The handlers were capsuled callable function.
   *
   * @readonly
   * @type {WeakSet<ListenerCleanup}
   */
  public readonly handlers: Set<unknown>

  /**
   * Represents the current status of the {@link Client}.
   *
   * @type {keyof typeof ClientStatus}
   */
  public status: keyof typeof ClientStatus

  /**
   * The options that have been used to constuct the {@link Client}.
   *
   * @readonly
   * @type {ClientOptions}
   */
  public readonly $options: ClientOptions

  /**
   * Represents the version of the {@link Client}.
   *
   * @readonly
   * @type {string}
   */
  public readonly version: string = 'Unknown'

  /**
   * Represents static itself that have been shared.
   *
   * @readonly
   * @type {typeof Client}
   */
  public readonly static: typeof Client = Client

  /**
   * Consumes provided options and then constructs a new client.
   *
   * @constructor
   * @param {ClientOptions} [options] An options for the client. If not
   * specified, {@link Client.defaultOptions} will be used instead.
   */
  public constructor(
    options: ClientOptions = Client.defaultOptions as ClientOptions
  ) {
    super(options)

    Reflect.defineProperty(this, 'version', {
      enumerable: true,
      get: getPackageVersion
    })

    this.guildConfigs = new Keyv<GuildConfig>({
      store: new KeyvFile({
        filename: join(ConfigDirectory, 'guilds.json'),
        writeDelay: 1 << 7
      })
    })
    this.commands = new Map()
    this.interactions = new Map()
    this.handlers = new Set()
    this.$options = Object.assign({}, options, this.options)

    this.status = ClientStatus.INITIALIZING

    console.log('Client is initializing...')
  }

  public async init(): Promise<void> {
    const locale = Locale.getInstance()

    await PokemonUtil.loadAllStats().catch()
    await PokemonUtil.loadAllForms().catch()
    await PokemonUtil.loadAllSpawners().catch()
    await PokemonUtil.loadAllDrops().catch()

    await this.loadCommands().catch(console.error)
    await this.loadInteractions().catch(console.error)
    await this.loadHandlers().catch(console.error)

    await setup().catch()
    await locale.init().catch()

    this.status = ClientStatus.INITIALIZED
  }

  /**
   * Increments max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to increment.
   * @returns {void}
   */
  public incrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  /**
   * Decrements max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to decrement.
   * @returns {void}
   */
  public decrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  private async loadCommands(): Promise<void> {
    // TODO
    Promise.resolve()
  }

  private async loadInteractions(): Promise<void> {
    // PixelPokedex does not have any interactions
    Promise.resolve()
  }

  private async loadHandlers(): Promise<void> {
    const handlerFilePathList = Util.walk(this.$options.handlersPath)

    for await (const handlerFilePath of handlerFilePathList) {
      const filenameWithExtension = basename(handlerFilePath)
      const filename = basename(
        filenameWithExtension,
        extname(filenameWithExtension)
      )

      if (
        ['Listener'].map(element => filename.includes(element)).some(Boolean)
      ) {
        continue
      }

      const { default: listener }: ListenerStruct = await import(
        `${handlerFilePath}`
      )
      const { listeners } = listener

      this.incrementMaxListener(listeners.length)
      this.handlers.add(listener(this))

      listeners.forEach($listener => {
        console.log(`Listener "${$listener}" is registered at ${filename}`)
      })
    }
  }
}
