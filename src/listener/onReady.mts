import type { Client } from 'io/github/sayakie/hakase/Client.mjs'
import { Events } from 'io/github/sayakie/hakase/Constant.mjs'
import pico from 'picocolors'

export function onReady(client: Client<true>): () => void {
  function onReady(): void {
    console.log(`Logged in as ${pico.green(client.user.tag)}`)
  }

  client.subscribe(Events.CLIENT_READY, onReady)

  return () => {
    client.unsubscribe(Events.CLIENT_READY, onReady)
  }
}
