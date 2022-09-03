import type { Stat as JsonStat } from '@internal/pixelmon'
import { Option } from '@sapphire/result'
import { s } from '@sapphire/shapeshift'
import { isNullish } from '@sapphire/utilities'
import type { Locale, LocaleString, LocalizationMap } from 'discord-api-types/v10'

import { Form } from '#lib/pokemon/Form.js'
import type { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'

export abstract class BasePokemonSpecies {
  readonly #name: string

  #localizedNames: LocalizationMap

  #localizedNamesBelongToForm: Record<string, LocalizationMap>

  readonly #dex: number

  readonly #generation: number

  readonly #defaultForms: string[]

  readonly #forms: Form[]

  public constructor(jsonData: JsonStat) {
    const { name, dex, generation, defaultForms, forms } = jsonData

    this.#name = s.string.parse(name)
    this.#localizedNames = {}
    this.#localizedNamesBelongToForm = {}
    this.#dex = s.number.positive.safeInt.parse(dex)
    this.#generation = s.number.positive.lessThanOrEqual(9).parse(generation)
    this.#defaultForms = s.array(s.string).unique.parse(defaultForms)
    this.#forms = forms.map(formData => new Form(this, formData))
  }

  /** The name of this species. */
  public get name(): string {
    return this.#name
  }

  /**
   * The localized names of this species.
   *
   * Note that the {@link #localizedNames} variable should be filled when language-loader is started.
   */
  public get localizedNames(): LocalizationMap {
    return this.#localizedNames
  }

  /**
   * The localized names of this species that belong to form name.
   */
  public get localizedNamesBelongToForm(): Record<string, LocalizationMap> {
    return this.#localizedNamesBelongToForm
  }

  /** The generation of this species. */
  public get generation(): number {
    return this.#generation
  }

  /** The pokedex holder of this species. */
  public get nationalPokedex(): SpeciesPokedexHolder {
    const pokedexHolder = {
      asNumber: () => this.#dex,
      asString: () => String(this.#dex).padStart(3, `0`)
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
  public get forms(): Form[] {
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
   * Gets the localized name belong to the species.
   *
   * @param {LocaleString} locale The locale to obtain
   * @returns {LocalizationMap} The localized name belong to this species
   */
  public getLocalizedName(locale: LocaleString): string | null {
    return Reflect.get(this.localizedNames, locale) ?? null
  }

  /**
   * Gets the localized names belong to the species.
   *
   * @returns {LocalizationMap} The localized names belong to this species
   */
  public getLocalizedNames(): LocalizationMap {
    return this.localizedNames
  }

  public getLocalizedNamesBelongToForm(): Record<string, LocalizationMap> {
    return this.localizedNamesBelongToForm
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
   * assert.equal(charizardPokedex.asNumber(), 6)
   * assert.equal(charizardPokedex.asString(), '006')
   * ```
   */
  public getNationalPokedex(): SpeciesPokedexHolder {
    return this.nationalPokedex
  }

  public getDefaultForms(): string[] {
    return this.defaultForms
  }

  public getForms(): Form[] {
    return this.forms
  }

  public setLocalizedName(locale: `${Locale}`, localizedName: string): void {
    this.#localizedNames[locale] = localizedName
  }

  public setLocalizedNames(localizedNames: LocalizationMap): void {
    this.#localizedNames = localizedNames
  }

  public setLocalizedNameBelongToForm(
    formName: string,
    locale: `${Locale}`,
    localizedName: string
  ): void {
    if (isNullish(this.localizedNamesBelongToForm[formName])) {
      this.#localizedNamesBelongToForm[formName] = {}
    }

    this.#localizedNamesBelongToForm[formName][locale] = localizedName
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
  public toHolder(): Option.Some<BasePokemonSpecies> {
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
    /* eslint-disable no-fallthrough */
    switch (hint) {
      case `default`:

      case `string`:

      default:
        return this.#name

      case `number`:
        return this.#dex
    }
    /* eslint-enable */
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
