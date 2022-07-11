import type { ApplicationCommandOptionChoiceData } from 'discord.js'
import { type LocaleString, Locale } from 'discord-api-types/v10'

import type { PokemonClient } from '../../client/PokemonClient.js'

export function fuzzyPokemonToSelectOption(
  fuzzyMatchResult: PokemonClient.FuzzilySearchPokemon.Result,
  locale: LocaleString = Locale.EnglishUS
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
