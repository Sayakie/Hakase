import { UserError } from '@sapphire/framework'
import { Option, Result } from '@sapphire/result'
import { isNumber } from '@sapphire/utilities'

import { Identifiers } from '../utils/Identifiers.js'
import type { PokemonSpecies } from './PokemonSpecies.js'

export abstract class BasePokemonSpecies {
  readonly #name: string
  readonly #dex: number
  readonly #generation: number
  readonly #defaultForms: string[]
  readonly #forms: Stat[]

  public constructor(raw: any) {
    const result = Result.from(() => JSON.parse(raw))
    if (result.isErr()) {
      throw new UserError({
        context: { raw },
        identifier: Identifiers.PokemonSpeciesConstructJsonParseFailure,
        message: `Failed to parse a raw data to proper JSON object.`
      })
    }

    const { name, dex, generation, defaultForms, forms } = result.unwrap()

    this.#name = name

    if (isNumber(dex)) {
      this.#dex = Math.max(0, dex)
    } else {
      throw new UserError({
        context: {
          value: dex
        },
        identifier: Identifiers.PokemonSpeciesConstructInvalidPokeDexType,
        message: `Failed to fetch national dex. Expected "Number" type but actual is ${typeof dex}`
      })
    }

    if (isNumber(generation)) {
      this.#generation = Math.clamp(generation, 0, 9)
    } else {
      throw new UserError({
        context: {
          value: generation
        },
        identifier: Identifiers.PokemonSpeciesConstructInvalidGenerationType,
        message: `Failed to fetch generation. Expected "Number" type but actual is ${typeof generation}`
      })
    }

    this.#defaultForms = defaultForms ?? []
    this.#forms = forms ?? []
  }

  /** The name of this species. */
  public get name(): string {
    return this.#name
  }

  /** The generation of this species. */
  public get generation(): number {
    return this.#generation
  }

  /** The pokedex holder of this species. */
  public get nationalPokedex(): SpeciesPokedexHolder {
    const result = Result.from(() => Number(this.#dex))
    const dex = result.unwrapOr(-1)

    const pokedexHolder = {
      asNumber: () => dex,
      asString: () => String(dex).padStart(3, `0`)
    }

    Reflect.set(pokedexHolder, `toString`, pokedexHolder.asString)
    Reflect.set(pokedexHolder, `valueOf`, pokedexHolder.asNumber)
    Object.freeze(pokedexHolder)

    return pokedexHolder
  }

  /** The default forms of this species. */
  public get defaultForms(): string[] {
    return this.#defaultForms.filter(Boolean)
  }

  /** The available all forms of thie species. */
  public get forms(): Stat[] {
    return this.#forms
  }

  /** The holder of this species. */
  public get holder(): Option.Some<BasePokemonSpecies> {
    return Option.some(this)
  }

  public get [Symbol.toStringTag](): string {
    return this.#name
  }

  /**
   * Gets the species name.
   *
   * @returns {string} This species name
   */
  public getName(): string {
    return this.name
  }

  /**
   * Gets the species generation.
   *
   * @returns {number} This species generation
   */
  public getGeneration(): number {
    return this.generation
  }

  /**
   * Gets the species national Pokédex that is wrapped.
   *
   * Note that this method returns a wrapper around the national pokedex number
   * of this species, which could be used to get the national pokedex number
   * **as a string with padded 3 digits, or as a number**.
   *
   * @returns {SpeciesPokedexHolder} This species national pokedex that is wrapped
   * @example
   * ```typescript
   * const charizardPokedex = PokemonSpecies.Charizard.getNationalPokedex()
   *
   * 6 === charizardPokedex.asNumber() // true
   * `006` === charizardPokedex.asString() // true
   * `6` === charizardPokedex.asString() // false
   * ```
   */
  public getNationalPokedex(): SpeciesPokedexHolder {
    return this.nationalPokedex
  }

  public getDefaultForms(): string[] {
    return this.defaultForms
  }

  public getForms(): Stat[] {
    return this.forms
  }

  /**
   * Gets whether the species is a legendary pokemon.
   *
   * @param {boolean} includeMythical Mythical including flag
   * @returns {boolean} Whether this species is a legendary or not
   */
  public isLegendary(): this is PokemonSpecies<`legendary` | `mythical`>
  public isLegendary(includeMythical: true): this is PokemonSpecies<`legendary` | `mythical`>
  public isLegendary(includeMythical: false): this is PokemonSpecies<`legendary`>
  public isLegendary(includeMythical: boolean = true): boolean {
    return (
      this.forms.find(({ name }) => name === ``)?.tags.includes(`legendary`) ??
      (includeMythical && this.isMythical())
    )
  }

  /**
   * Gets whether the species is a mythical pokemon.
   *
   * @returns {boolean} Whether this species is a mythical or not
   */
  public isMythical(): this is PokemonSpecies<`mythical`> {
    return this.forms.find(({ name }) => name === ``)?.tags.includes(`mythical`) ?? false
  }

  /**
   * Gets whether the species is a ultrabeast pokemon.
   *
   * @returns {boolean} Whether this species is a ultrabeast or not
   */
  public isUltraBeast(): this is PokemonSpecies<`ultrabeast`> {
    return this.forms.find(({ name }) => name === ``)?.tags.includes(`ultrabeast`) ?? false
  }

  /**
   * Gets the species holder.
   *
   * @returns {Option<BasePokemonSpecies>} This species holder
   */
  public toHolder(): Option<BasePokemonSpecies> {
    return this.holder
  }

  public toString(): string {
    return this.#name
  }

  public valueOf(): number {
    return this.#dex
  }

  public [Symbol.toPrimitive](hint: `default`): string
  public [Symbol.toPrimitive](hint: `string`): string
  public [Symbol.toPrimitive](hint: `number`): number
  public [Symbol.toPrimitive](hint: string): string | number {
    switch (hint) {
      case `default`:
      case `string`:
      default:
        return this.#name
      case `number`:
        return this.#dex
    }
  }
}

/**
 * The return type of {@link BasePokemonSpecies.nationalPokedex} and {@link BasePokemonSpecies.getNationalPokedex}
 */
export interface SpeciesPokedexHolder {
  asNumber(): number
  asString(): string
}

export namespace BasePokemonSpecies {
  export type PokedexHolder = SpeciesPokedexHolder
}
