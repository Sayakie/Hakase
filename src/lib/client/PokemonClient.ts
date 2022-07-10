import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { isNullish, isNullishOrEmpty } from '@sapphire/utilities'
import { envParseNumber } from '@skyra/env-utilities'
import type { LocaleString, LocalizationMap } from 'discord-api-types/v10'
import { Locale } from 'discord-api-types/v10'

import { PokemonSpecies } from '../pokemon/PokemonSpecies.js'
import { StoreRegistryEntries } from '../utils/Identifiers.js'

export interface FuzzilySearchPokemonOptions {
  locale: LocaleString
  offset?: number
  take?: number
  includeSpecialPokemon?: boolean
}

export interface FuzzilySearchPokemonResult {
  name: string
  localizedName: string
  formName: string
}

export class PokemonClient {
  public readonly relatedMatchThreshold: number

  public constructor() {
    this.relatedMatchThreshold = envParseNumber(
      `FUZZY_SEARCH_POKEMON_RELATED_MATCH_THRESHOLD`,
      0.125
    )
  }

  // public async getPokemon(pokemonLike: string) {}
  public async fuzzilySearchPokemon(
    pokemonLike: string,
    {
      locale = Locale.EnglishUS,
      offset = 0,
      take = 20,
      includeSpecialPokemon = true
    }: FuzzilySearchPokemonOptions
  ): Promise<FuzzilySearchPokemonResult[]> {
    const strategyStore = container.client.stores.get(StoreRegistryEntries.Strategies)

    let fuzzyPokemonStrategy = strategyStore.find(
      ({ locale: strategyLocale, locales }) => strategyLocale === locale || locales.includes(locale)
    )
    fuzzyPokemonStrategy ??= strategyStore.get(Locale.EnglishUS)!

    type SimilairtyResult = [
      PokemonSpecies,
      {
        localizedName: string
        formName: string
      },
      number
    ]
    const results: FuzzilySearchPokemonResult[] = []
    const similarityResults: SimilairtyResult[] = []

    for (const species of PokemonSpecies) {
      let isMatch = false
      let matchSimilarityOrigin = 0
      for (const form of species.forms) {
        const value = Result.from(
          () => species.localizedNamesBelongToForm[form.name.toLowerCase()][locale]
        ).unwrapOr(null)

        if (isNullish(value) || !fuzzyPokemonStrategy.fits(value, pokemonLike)) {
          continue
        }

        const baseSimilarity = fuzzyPokemonStrategy.similarity(value, pokemonLike)
        const similarity = isMatch
          ? Math.max(
              Math.cbrt(Math.sqrt(baseSimilarity) - this.relatedMatchThreshold),
              matchSimilarityOrigin
            )
          : baseSimilarity

        similarityResults.push([
          species,
          { formName: form.name.toLowerCase(), localizedName: value },
          similarity
        ])

        if (!isMatch) {
          isMatch = true
          matchSimilarityOrigin = baseSimilarity
        }
      }
    }

    if (similarityResults.length) {
      similarityResults
        .sort(([, , similarityOfA], [, , similarityOfB]) => similarityOfB - similarityOfA)
        .slice(offset, offset + take)
        .forEach(([species, { formName, localizedName }]) => {
          results.push({
            formName,
            localizedName,
            name: species.name
          })
        })
    }
    // todo: else, appends the popular pokemon lists

    return results
  }
}

export namespace PokemonClient {
  export namespace FuzzilySearchPokemon {
    export type Options = FuzzilySearchPokemonOptions
    export type Result = FuzzilySearchPokemonResult
  }
}
