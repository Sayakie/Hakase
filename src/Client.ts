import {
  type ClientOptions as DiscordJSClientOptions,
  Client as DiscordJSClient
} from 'discord.js'

import { getPackageVersion } from './util/function.js'
import type { Identifiable } from './util/Identifiable.js'

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
export class Client<Ready extends boolean = boolean>
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
   * Represents the version of the {@link Client}.
   *
   * @readonly
   * @type {string}
   */
  public get version(): string {
    return getPackageVersion()
  }

  /**
   * Increments max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to increment.
   */
  public incrementMaxListener(count: number = 1): void {
    if (count <= 0) {
      count = 1
    }

    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  /**
   * Decrements max listeners by one or more, if they are not zero.
   *
   * @param {number} [count=1] The number of listeners to decrement.
   */
  public decrementMaxListener(count: number = 1): void {
    if (count <= 0) {
      count = 1
    }

    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners - count)
    }
  }

  /**
   * Returns the unique id of the {@link Client}.
   *
   * @returns {string} The unique id of the {@link Client}.
   */
  public getUniqueId(): string {
    return `Not implemented`
  }
}
