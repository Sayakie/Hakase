import type { Option } from '@sapphire/result'

export abstract class BasePokemonSpecies {
  /** The name of this species. */
  public abstract get name(): string

  /** The generation of this species. */
  public abstract get generation(): number

  /** The pokedex holder of this species. */
  public abstract get nationalPokedex(): SpeciesPokedexHolder

  /** The holder of this species. */
  public abstract get holder(): Option<BasePokemonSpecies>

  /**
   * Gets the species name.
   *
   * @returns {string} This species name
   */
  public abstract getName(): string

  /**
   * Gets the species generation.
   *
   * @returns {number} This species generation
   */
  public abstract getGeneration(): number

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
  public abstract getNationalPokedex(): SpeciesPokedexHolder

  /**
   * Gets whether the species is a legendary pokemon.
   *
   * @param {boolean} includeMythical Mythical including flag
   * @returns {boolean} Whether this species is a legendary or not
   */
  public abstract isLegendary(): boolean
  public abstract isLegendary(includeMythical: boolean): boolean

  /**
   * Gets whether the species is a mythical pokemon.
   *
   * @returns {boolean} Whether this species is a mythical or not
   */
  public abstract isMythical(): boolean

  /**
   * Gets whether the species is a ultrabeast pokemon.
   *
   * @returns {boolean} Whether this species is a ultrabeast or not
   */
  public abstract isUltraBeast(): boolean

  /**
   * Gets the species holder.
   *
   * @returns {Option<BasePokemonSpecies>} This species holder
   */
  public abstract toHolder(): Option<BasePokemonSpecies>

  public abstract [Symbol.toPrimitive](hint: `default`): string
  public abstract [Symbol.toPrimitive](hint: `string`): string
  public abstract [Symbol.toPrimitive](hint: `number`): number
  public abstract [Symbol.toPrimitive](hint: string): string | number
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
