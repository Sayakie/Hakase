import type { Awaitable } from 'discord.js'

import type { ClientOptions } from '../Client.mjs'
import { Client } from '../Client.mjs'
import { Messages } from '../Message.mjs'
import { getPackageVersion } from '../util/function/getPackageVersion.mjs'

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

  public getUniqueId(): string {
    return `Not implemented`
  }
}
