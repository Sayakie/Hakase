import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { Listener } from '@sapphire/framework'

import { ListenerIdentifiers } from '#lib/utils/Identifiers.js'

@Mixin<Listener.Options>({
  emitter: process,
  event: `SIGINT`,
  name: ListenerIdentifiers.Process$SIGINT,
  once: true
})
export class HakaseListener extends Listener<`SIGINT`> {
  public override async run(_signal: NodeJS.Signals): Promise<void> {
    this.container.redis.disconnect()
    this.container.client.destroy()
  }
}
