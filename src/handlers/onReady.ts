import { Constants } from 'discord.js'
import pico from 'picocolors'

import type { ListenerCleanup } from '@/handlers/Listener.js'
import type { Client } from '@/structures/Client.js'

function clientInitializdSignalHandler(client: Client): ListenerCleanup {
  function onReady(): void {
    console.log(`Logged in as ${pico.green(client.user.tag)}`)
  }

  function onError(error: Error): void {
    console.error(pico.red('[ERR]'), error.message)
  }

  function onWarn(message: string): void {
    console.warn(pico.yellow('[WARN]'), message)
  }

  function onDebug(message: string): void {
    if (
      message.includes('HeartbeatTimer') ||
      message.includes('Heartbeat acknowledged')
    ) {
      return
    }

    console.debug(pico.blue('[DEBUG]'), message)
  }

  client.on(Constants.Events.CLIENT_READY, onReady)
  client.on(Constants.Events.ERROR, onError)
  client.on(Constants.Events.WARN, onWarn)
  client.on(Constants.Events.DEBUG, onDebug)

  return () => {
    client.off(Constants.Events.CLIENT_READY, onReady)
    client.off(Constants.Events.ERROR, onError)
    client.off(Constants.Events.WARN, onWarn)
    client.off(Constants.Events.DEBUG, onDebug)
  }
}

Reflect.defineProperty(clientInitializdSignalHandler, 'listeners', {
  value: ['onReady']
})

export default clientInitializdSignalHandler
