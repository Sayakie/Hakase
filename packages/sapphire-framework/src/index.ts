import type { LocalizationMap } from 'discord-api-types/v10'

export * from '@sapphire/framework'
export * from './Client.js'

interface LocalizationProperties {
  nameLocalizations: LocalizationMap | null
  descriptionLocalizations: LocalizationMap | null
}

declare module '@sapphire/framework' {
  interface Command extends LocalizationProperties {}

  interface CommandOptions extends LocalizationProperties {}
}
