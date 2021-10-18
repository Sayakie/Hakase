import type { Client } from '@/structures/Client'

export type ListenerCleanup = () => void | Promise<void>
export interface Listener {
  (client: Client): ListenerCleanup

  listeners: string[]
}
export interface ListenerStruct {
  default: Listener
}
