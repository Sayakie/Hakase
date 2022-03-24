import type { Awaitable } from 'discord.js'
import type { ClientOptions } from 'io/github/sayakie/hakase/Client.mjs'
import { Client } from 'io/github/sayakie/hakase/Client.mjs'
import { getPackageVersion } from 'io/github/sayakie/hakase/util/function/getPackageVersion.mjs'

import { Messages } from '../Message.mjs'

export class ClientImpl<Ready extends boolean = boolean> extends Client<Ready> {
  public commands = new Map()
  public interactions = new Map()
  public handlers = new Set()

  public constructor(
    options: ClientOptions = Client.defaultOptions as ClientOptions
  ) {
    super(options)
  }

  public get version(): string {
    return getPackageVersion()
  }

  public incrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  public decrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  // Accepts any number of arguments and throws an exception.
  public on(): never {
    throw Messages.DEPRECATED_METHOD(`Use 'subscribe' instead.`)
  }

  // Accepts any number of arguments and throws an exception.
  public off(): never {
    throw Messages.DEPRECATED_METHOD(`Use 'unsubscribe' instead.`)
  }

  public subscribe(
    event: string,
    listener: (...args: any[]) => Awaitable<void>
  ): this {
    // @ts-expect-error Intended action
    return super.on(event, listener)
  }

  public unsubscribe(
    event: string,
    listener: (...args: any[]) => Awaitable<void>
  ): this {
    // @ts-expect-error Intended action
    return super.off(event, listener)
  }

  public getUniqueId(): string {
    return `Not implemented`
  }
}
