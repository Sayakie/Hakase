import type { ApplicationCommandOptionChoiceData, MessageSelectOptionData } from 'discord.js'
import type { LocaleString } from 'discord-api-types/v10'
import { Locale } from 'discord-api-types/v10'

import type { PokemonClient } from '../../client/PokemonClient.js'

export function fuzzyPokemonToSelectOption(
  { name, localizedName, value }: PokemonClient.FuzzilySearchPokemon.Result,
  locale: LocaleString = Locale.EnglishUS
): ApplicationCommandOptionChoiceData {
  return {
    name,
    nameLocalizations,
    value
  }
}
