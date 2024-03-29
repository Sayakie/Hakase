import { container } from '@sapphire/pieces'
import { type Nullish, isNullish } from '@sapphire/utilities'
import { envParseNumber } from '@skyra/env-utilities'
import { type LocaleString, Locale } from 'discord-api-types/v10'

import type { Form } from '#lib/pokemon/Form.js'
import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import type { FuzzyPokemonStrategy } from '#lib/structures/FuzzyPokemonStrategy.js'
import { StoreRegistryEntries } from '#lib/utils/Identifiers.js'
import { PokemonChatInputQuery } from '#lib/utils/regexes.js'

export interface GetPokemonOptions {
  locale: LocaleString
}

export interface GetPokemonResult {
  species: PokemonSpecies
  form: Form
}

export interface FuzzilySearchPokemonOptions {
  locale: LocaleString
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

  private static getSuitableFuzzyPokemonStrategy<T extends LocaleString = Locale.EnglishUS>(
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

  public async getPokemon(
    spec: string,
    _options: GetPokemonOptions
  ): Promise<GetPokemonResult | Nullish> {
    const queryResult = PokemonChatInputQuery.exec(spec)

    if (isNullish(queryResult)) return

    const species = PokemonSpecies.fromName(queryResult.groups?.pokemon)

    if (species.isNone()) return

    const form = species.unwrap().getForm(queryResult.groups?.form)

    if (form.isNone()) return

    return {
      form: form.unwrap(),
      species: species.unwrap()
    }
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

        if (form.name !== '' && translated.formName === form.translation().key()) {
          continue
        }

        let name = translated.speciesName as string

        if (form.name !== '' && translated.formName !== '') {
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
  export namespace GetPokemon {
    export type Options = GetPokemonOptions
    export type Result = GetPokemonResult
  }

  export namespace FuzzilySearchPokemon {
    export type Options = FuzzilySearchPokemonOptions
    export type Result = FuzzilySearchPokemonResult
  }
}
