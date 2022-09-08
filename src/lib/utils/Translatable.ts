import type { Nullish } from '@sapphire/utilities'
import type { Locale } from 'discord-api-types/v10'

export interface Translatable {
  translation(): Translation
}

export interface Translation {
  key(): string

  // with(locale: `${Locale}`): string | Nullish
  with(locale: `${Locale}`, namespace?: `${string}:`): string | Nullish
}
