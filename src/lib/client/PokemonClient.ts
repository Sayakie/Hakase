import { container } from '@sapphire/pieces'
import { isNullish } from '@sapphire/utilities'
import { envParseNumber } from '@skyra/env-utilities'
import { Locale } from 'discord-api-types/v10'

import type { Form } from '#lib/pokemon/Form.js'
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
  species: PokemonSpecies
  form: Form
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
    { locale = Locale.EnglishUS, offset = 0, take = 20 }: FuzzilySearchPokemonOptions
  ): Promise<FuzzilySearchPokemonResult[]> {
    type SimilairtyResult = FuzzilySearchPokemonResult & {
      similarity: number
    }
    const results: FuzzilySearchPokemonResult[] = []

    const similarityResults: SimilairtyResult[] = []

    const fuzzyPokemonStrategy = PokemonClient.getSuitableFuzzyPokemonStrategy(locale)

    for (const species of PokemonSpecies) {
      let isMatch = false

      let matchSimilarityOrigin = 0

      for (const form of species.forms) {
        const translated = {
          formName: form.translation().with(locale),
          speciesName: species.translation().with(locale)
        }

        if (form.name !== `` && translated.formName === form.translation().key()) {
          continue
        }

        let name = translated.speciesName as string

        if (form.name !== `` && translated.formName !== ``) {
          name += translated.formName
        }

        if (isNullish(name) || !fuzzyPokemonStrategy.fits(name, pokemonLike)) {
          continue
        }

        const baseSimilarity = fuzzyPokemonStrategy.similarity(name, pokemonLike)

        const similarity = isMatch
          ? Math.max(
              Math.cbrt(Math.sqrt(baseSimilarity) - this.relatedMatchThreshold),
              matchSimilarityOrigin
            )
          : baseSimilarity

        similarityResults.push({
          form,
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
        .forEach(({ species, form }) => {
          results.push({
            form,
            species
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
