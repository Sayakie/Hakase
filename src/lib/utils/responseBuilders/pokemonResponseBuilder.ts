import type { ApplicationCommandOptionChoiceData } from 'discord.js'
import { Locale } from 'discord-api-types/v10'

import type { PokemonClient } from '#lib/client/PokemonClient.js'

export interface FuzzyPokemonToCommandChoiceDataOptions {
  locale: `${Locale}`
}

export function fuzzyPokemonToCommandChoiceData(
  fuzzyMatchResult: PokemonClient.FuzzilySearchPokemon.Result,
  { locale = Locale.EnglishUS }: FuzzyPokemonToCommandChoiceDataOptions
): ApplicationCommandOptionChoiceData {
  return {
    // TODO: Should change to `fuzzyMatchResult.name` when Discord slate-2 is landing.
    name: fuzzyMatchResult.localizedName,
    nameLocalizations: {
      [locale]: fuzzyMatchResult.localizedName
    },
    value: `${fuzzyMatchResult.name} (${fuzzyMatchResult.formName})`
  }
}
