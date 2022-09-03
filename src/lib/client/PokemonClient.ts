import { container } from '@sapphire/pieces'
import { isNullish } from '@sapphire/utilities'
import { envParseNumber } from '@skyra/env-utilities'
import { Locale } from 'discord-api-types/v10'

import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import type { FuzzyPokemonStrategy } from '#lib/structures/FuzzyPokemonStrategy.js'
import { StoreRegistryEntries } from '#lib/utils/Identifiers.js'

export interface FuzzilySearchPokemonOptions {
  locale: `${Locale}`
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

  private static getSuitableFuzzyPokemonStrategy<T extends `${Locale}` = Locale.EnglishUS>(
    locale: T
  ): FuzzyPokemonStrategy<T> {
    const strategyStore = container.client.stores.get(StoreRegistryEntries.Strategies)

    const fuzzyPokemonStrategy =
      strategyStore.find(
        ({ locale: strategyLocale, locales }) =>
          strategyLocale === locale || locales.includes(locale)
      ) ?? //
      strategyStore.get(Locale.EnglishUS)!

    return fuzzyPokemonStrategy as FuzzyPokemonStrategy<T>
  }

  public async fuzzilySearchPokemon(
    pokemonLike: string,
    {
      locale = Locale.EnglishUS,
      offset = 0,
      take = 20,
      includeSpecialPokemon = true
    }: FuzzilySearchPokemonOptions
  ): Promise<FuzzilySearchPokemonResult[]> {
    interface SimilairtyResult {
      species: PokemonSpecies
      localizedName: string
      formName: string
      similarity: number
    }
    const results: FuzzilySearchPokemonResult[] = []

    const similarityResults: SimilairtyResult[] = []

    const fuzzyPokemonStrategy = PokemonClient.getSuitableFuzzyPokemonStrategy(locale)

    for (const species of PokemonSpecies) {
      let isMatch = false

      let matchSimilarityOrigin = 0

      for (const form of species.forms) {
        const localizedName = form.translation().with(locale)

        if (isNullish(localizedName) || !fuzzyPokemonStrategy.fits(localizedName, pokemonLike)) {
          continue
        }

        const baseSimilarity = fuzzyPokemonStrategy.similarity(localizedName, pokemonLike)

        const similarity = isMatch
          ? Math.max(
              Math.cbrt(Math.sqrt(baseSimilarity) - this.relatedMatchThreshold),
              matchSimilarityOrigin
            )
          : baseSimilarity

        similarityResults.push({
          formName: form.name.toLowerCase(),
          localizedName,
          similarity,
          species
        })

        if (!isMatch) {
          isMatch = true
          matchSimilarityOrigin = baseSimilarity
        }
      }
    }

    if (similarityResults.length) {
      similarityResults
        .sort(
          ({ similarity: similarityOfA }, { similarity: similarityOfB }) =>
            similarityOfB - similarityOfA
        )
        .slice(offset, offset + take)
        .forEach(({ species, formName, localizedName }) => {
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
