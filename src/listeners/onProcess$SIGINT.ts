import { ApplyOptions as Mixin } from '@sapphire/decorators'
import type { Events } from '@sapphire/framework'
import { type Store, Listener } from '@sapphire/framework'
import { blue, blueBright, gray } from 'colorette'
import type { Client } from 'discord.js'

import { ListenerIdentifiers } from '../lib/utils/Identifiers.js'

@Mixin<Listener.Options>({
  emitter: process,
  event: `SIGINT`,
  name: ListenerIdentifiers.Process$SIGINT,
  once: true
})
export class HakaseListener extends Listener<`SIGINT`> {
  public override async run(_signal: NodeJS.Signals): Promise<void> {
    this.container.client.destroy()
  }
}
