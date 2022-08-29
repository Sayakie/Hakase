import { Locale } from 'discord-api-types/v10'

import { PokemonSpecies } from '../../pokemon/PokemonSpecies.js'

function getProperPokemonName$EnglishUS(
  locale: `${Locale}`,
  pokemon: PokemonSpecies,
  formName: string
): string {
  switch (pokemon) {
    default: {
      return `${pokemon.getLocalizedName(locale)} ${formName}`
    }
  }
}

function getProperPokemonName$Korean(
  locale: `${Locale}`,
  pokemon: PokemonSpecies,
  formName: string
): string {
  switch (pokemon) {
    case PokemonSpecies.Hoopa: {
      return `${formName} ${pokemon.getLocalizedName(locale)}`
    }

    default: {
      return `${pokemon.getLocalizedName(locale)} ${formName}`
    }
  }
}

export function getProperPokemonName(
  locale: `${Locale}`,
  pokemon: PokemonSpecies,
  formName: string
): string {
  switch (locale) {
    case Locale.EnglishUS:

    default: {
      return getProperPokemonName$EnglishUS(locale, pokemon, formName)
    }

    case Locale.Korean: {
      return getProperPokemonName$Korean(locale, pokemon, formName)
    }
  }
}
