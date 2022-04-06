import type {
  Awaitable,
  ClientEvents,
  ClientOptions as DiscordJSClientOptions
} from 'discord.js'
import { Client as DiscordJSClient } from 'discord.js'

import { Messages } from './Message.mjs'
import { ClientImpl } from './private/ClientImpl.mjs'
import type { Identifiable } from './util/Identifiable.mjs'

/**
 * An options for a {@link Client}.
 *
 * @interface
 * @extends {DiscordJSClientOptions}
 */
export type ClientOptions = DiscordJSClientOptions & {
  // [P in ArtifactPaths]: string
}

/**
 * The main hub for interacting with the Discord API, and the starting point for
 * Hakase bot. It extends {@link DiscordJSClient} and adds some useful methods
 * and offers enhanced features.
 *
 * @extends {DiscordJSClient}
 */
export abstract class Client<Ready extends boolean = boolean>
  extends DiscordJSClient<Ready>
  implements Identifiable
{
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
   * Returns whether the {@link Client} has been started.
   *
   * @readonly
   * @type {boolean}
   */
  private static startedIn: boolean

  /**
   * The commands that have been registered by the {@link Client}.
   *
   * @readonly
   * @type {ReadonlyMap<string, Command>}
   */
  public abstract readonly commands: ReadonlyMap<string, unknown>

  /**
   * The interactions that have been registered by the {@link Client}.
   * It includes slash commands and/or context menus.
   *
   * @readonly
   * @type {ReadonlyMap<string, unknown>}
   */
  public abstract readonly interactions: ReadonlyMap<string, unknown>

  /**
   * The cleanup handlers that have been registered by the {@link Client}.
   * The handlers were capsuled callable function.
   *
   * @readonly
   * @type {WeakSet<ListenerCleanup}
   */
  public abstract readonly handlers: Set<unknown>

  /**
   * Represents the version of the {@link Client}.
   *
   * @readonly
   * @type {string}
   */
  public abstract get version(): string

  /**
   * Constructs a new {@link Client} instance.
   *
   * @param {ClientOptions} [options] Options for the Client.
   * @returns {Client} A new Client instance.
   * @throws {IllegalStateException} If the Client has already been started.
   */
  public static of(options?: ClientOptions): Client {
    if (Client.startedIn) {
      throw Messages.CLIENT_ALREADY_STARTED
    }

    Client.startedIn = true
    return new ClientImpl(options)
  }

  /**
   * Increments max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to increment.
   */
  public abstract incrementMaxListener(count?: number): void

  /**
   * Decrements max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to decrement.
   */
  public abstract decrementMaxListener(count?: number): void

  /**
   * Returns the unique id of the {@link Client}.
   *
   * @returns {string} The unique id of the {@link Client}.
   */
  public abstract getUniqueId(): string
}
