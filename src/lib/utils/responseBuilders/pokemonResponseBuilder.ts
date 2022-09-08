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
  const translated = {
    formName: fuzzyMatchResult.form.translation().with(locale),
    speciesName: fuzzyMatchResult.species.translation().with(locale)
  }

  let name = translated.speciesName as string

  if (fuzzyMatchResult.form.name !== `` && translated.formName !== ``) {
    name += ` (${translated.formName})`
  }

  const value = `${fuzzyMatchResult.species.name} (${fuzzyMatchResult.form.name})`

  return {
    name,
    nameLocalizations: {
      [locale]: name
    },
    value
  }
}
