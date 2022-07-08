import type { LocaleString as Locale } from 'discord-api-types/v10'
import i18next from 'i18next'

export interface Translation {
  getId(): string

  get(): string
  get(locale: Locale): string
}

export const Translation = {
  of(id: string): Translation {
    return {
      get: (locale: Locale = `en-US`) => i18next.t(id, { lng: locale }),
      getId: () => id
    }
  }
}
