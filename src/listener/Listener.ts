import type { Awaitable, ClientEvents } from 'discord.js'

import type { Client } from '../Client.js'

export type Handlers = [
  {
    [K in keyof ClientEvents]: [
      K,
      (...args: ClientEvents[K]) => Awaitable<void>
    ]
  }[keyof ClientEvents]
]

export function setup(
  client: Client,
  handlers: Array<[string, (...args: any[]) => Awaitable<void>]>
): () => void {
  handlers.forEach(([event, handler]) => client.on(event, handler))

  return () => {
    handlers.forEach(([event, handler]) => client.off(event, handler))
  }
}
