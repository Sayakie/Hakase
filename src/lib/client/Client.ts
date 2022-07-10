import { SapphireClient } from '@sapphire/framework'
import { container } from '@sapphire/pieces'
import type { ClientOptions } from 'discord.js'

import { FuzzyPokemonStrategyStore } from '../structures/FuzzyPokemonStrategyStore.js'

export interface ClientProperties {
  prisma: unknown
}

export class Client<Ready extends boolean = boolean> extends SapphireClient<Ready> {
  /**
   * A prisma client, used for interacting with DB.
   *
   * Note that the property type to be overriden by the developer.
   * @since 0.1.0
   * @example
   * ```typescript
   * declare module '@hakase/sapphire-framework' {
   *   interface ClientProperties {
   *     prisma: import(`@prisma/client`).PrismaClient
   *   }
   * }
   *
   * const client = new Client({
   *   // with rest options...
   *   prisma: new PrismaClient()
   * })
   * ```
   */
  public override readonly prisma: unknown

  public constructor(options: ClientOptions) {
    super(options)

    this.prisma = options.prisma
    container.prisma = this.prisma

    this.stores.register(new FuzzyPokemonStrategyStore())
  }
}

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module '@sapphire/pieces' {
  interface Container extends ClientProperties {}
}

declare module '@sapphire/framework' {
  interface SapphireClient extends ClientProperties {}
}

declare module 'discord.js' {
  interface Client extends ClientProperties {}

  interface ClientOptions extends ClientProperties {}
}
/* eslint-enable */
