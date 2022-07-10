import type { PieceContext } from '@sapphire/pieces'
import { Piece } from '@sapphire/pieces'
import { envParseNumber } from '@skyra/env-utilities'
import type { LocaleString } from 'discord-api-types/v10'

export abstract class FuzzyPokemonStrategy<
  Locale extends LocaleString = LocaleString,
  O extends FuzzyPokemonStrategyOptions = FuzzyPokemonStrategyOptions
> extends Piece<O> {
  /**
   * The locale to determine how to compare given value to expected.
   */
  public readonly locale: Locale

  public readonly locales: LocaleString[]

  public threshold: number

  public constructor(context: PieceContext, options: O = {} as O) {
    super(context, options)

    this.locale = options.locale as Locale
    this.locales = options.locales ?? [options.locale]
    this.threshold = envParseNumber(`FUZZY_SEARCH_POKEMON_THRESHOLD`, 0.3)
  }

  /**
   * Checks if the given {@param {string} compareTo} and {@param {string} compareWith}
   * fits for this locale strategy.
   *
   * @param {string} compareTo The value to compare
   * @param {string} compareWith The value to compare with
   * @returns {boolean} True if this strategy fits the given values, false otherwise
   */
  public abstract fits(compareTo: string, compareWith: string): boolean

  public abstract similarity(compareTo: string, compareWith: string): number
}

export interface FuzzyPokemonStrategyOptions extends Piece.Options {
  readonly locale: LocaleString
  readonly locales?: LocaleString[]
  readonly threshold?: number
}

export namespace FuzzyPokemonStrategy {
  export type Options = FuzzyPokemonStrategyOptions
}
