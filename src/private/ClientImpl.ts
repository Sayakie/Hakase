import type { Awaitable } from 'discord.js'

import type { ClientOptions } from '../Client.js'
import { Client } from '../Client.js'
import { Messages } from '../Message.js'
import { getPackageVersion } from '../util/function/getPackageVersion.js'

export class ClientImpl<Ready extends boolean = boolean> extends Client<Ready> {
  public override commands = new Map()
  public override interactions = new Map()
  public override handlers = new Set()

  public constructor(
    options: ClientOptions = Client.defaultOptions as ClientOptions
  ) {
    super(options)
  }

  public override get version(): string {
    return getPackageVersion()
  }

  public override incrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  public override decrementMaxListener(count: number = 1): void {
    const maxListeners = this.getMaxListeners()
    if (maxListeners !== 0) {
      this.setMaxListeners(maxListeners + count)
    }
  }

  public override getUniqueId(): string {
    return `Not implemented`
  }
}
