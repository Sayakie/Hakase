import { UserError } from '@sapphire/framework'
import { Option, Result } from '@sapphire/result'
import { isNumber } from '@sapphire/utilities'

import { Identifiers } from '../utils/Identifiers.js'
import type { PokemonSpecies } from './PokemonSpecies.js'

export abstract class BasePokemonSpecies {
  readonly #name: string
  readonly #dex: number
  readonly #generation: number

  // @ts-expect-error This property would be used in extended class
  readonly #defaultForms: string[]

  // @ts-expect-error This property would be used in extended class
  readonly #forms: any[]

  public constructor(raw: any) {
    const result = Result.from(() => JSON.parse(raw))
    if (result.isErr()) {
      throw new UserError({
        context: { raw },
        identifier: Identifiers.PokemonSpeciesConstructJsonParseFailure,
        message: `Failed to parse a raw data to proper JSON object.`
      })
    }

    const data = result.unwrap()

    this.#name = data.name

    if (isNumber(data.dex)) {
      this.#dex = Math.max(0, data.dex)
    } else {
      throw new UserError({
        context: {
          value: data.dex
        },
        identifier: Identifiers.PokemonSpeciesConstructInvalidPokeDexType,
        message: `Failed to fetch national dex. Expected "Number" type but actual is ${typeof data.dex}`
      })
    }

    if (isNumber(data.generation)) {
      this.#generation = Math.clamp(data.generation, 0, 9)
    } else {
      throw new UserError({
        context: {
          value: data.generation
        },
        identifier: Identifiers.PokemonSpeciesConstructInvalidGenerationType,
        message: `Failed to fetch generation. Expected "Number" type but actual is ${typeof data.dex}`
      })
    }

    this.#defaultForms = data.defaultForms ?? []
    this.#forms = data.forms ?? []
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

  /** The holder of this species. */
  public get holder(): Option.Some<BasePokemonSpecies> {
    return Option.some(this)
  }

  public get [Symbol.toStringTag](): string {
    return `${this.constructor.name}#${this.#name}`
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

  /**
   * Gets whether the species is a legendary pokemon.
   *
   * @param {boolean} includeMythical Mythical including flag
   * @returns {boolean} Whether this species is a legendary or not
   */
  public isLegendary(): this is PokemonSpecies<`legendary` | `mythical`>
  public isLegendary(includeMythical: true): this is PokemonSpecies<`legendary` | `mythical`>
  public isLegendary(includeMythical: false): this is PokemonSpecies<`legendary`>
  public isLegendary(_includeMythical: boolean = true): boolean {
    return true
  }

  /**
   * Gets whether the species is a mythical pokemon.
   *
   * @returns {boolean} Whether this species is a mythical or not
   */
  public isMythical(): this is PokemonSpecies<`mythical`> {
    return true
  }

  /**
   * Gets whether the species is a ultrabeast pokemon.
   *
   * @returns {boolean} Whether this species is a ultrabeast or not
   */
  public isUltraBeast(): this is PokemonSpecies<`ultrabeast`> {
    return true
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
