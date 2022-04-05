import type { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import {
  FormBelongToSpeciesBuilderImpl,
  FormBelongToSpeciesImpl
} from 'io/github/sayakie/hakase/private/entity/FormBelongToSpeciesImpl.mjs'
import type { Cloneable } from 'io/github/sayakie/hakase/util/Cloneable.mjs'
import type { Comparable } from 'io/github/sayakie/hakase/util/Comparable.mjs'
import type { ResettableBuilder } from 'io/github/sayakie/hakase/util/ResettableBuilder.mjs'

export interface FormBelongToSpeciesBuilder
  extends ResettableBuilder<FormBelongToSpecies, FormBelongToSpeciesBuilder> {
  /**
   * Sets the species of this form.
   *
   * @param {Species} species The species of this form
   * @returns {this} This builder, for chaining
   */
  species(species: Species): this

  /**
   * Sets the form integer of this form.
   *
   * @param {number} form The form integer of this form
   * @returns {this} This builder, for chaining
   */
  form(form: number): this

  /**
   * Sets the flags of this form.
   *
   * @param {...number} flags The flags of this form
   * @returns {this} This builder, for chaining
   */
  flags(...flags: number[]): this

  /**
   * Sets the sprite suffix of this form.
   *
   * @param {?string | null} [spriteSuffix] The sprite suffix of this form
   * @returns {this} This builder, for chaining
   */
  spriteSuffix(spriteSuffix?: string): this

  /**
   * Sets the image suffix of this form.
   *
   * @param {?string | null} [imageSuffix] The image suffix of this form
   * @returns {this} This builder, for chaining
   */
  imageSuffix(imageSuffix?: string): this

  /**
   * Builds the {@link FormBelongToSpecies} from the values in this builder.
   *
   * @returns {FormBelongToSpecies} The FormBelongToSpecies
   */
  build(): FormBelongToSpecies
}

export abstract class FormBelongToSpecies
  implements Comparable, Cloneable<FormBelongToSpecies>
{
  /**
   * Collection of all species whom legacy normal forms exist for.
   */
  public static readonly customNormalForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have mega evolution forms.
   */
  public static readonly megaForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have mega x, y forms.
   */
  public static readonly megaXYForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have genders.
   */
  public static readonly genderForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have alolan forms.
   */
  public static readonly alolanForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have galarian forms.
   */
  public static readonly galarianForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all species whom have hisuian forms.
   */
  public static readonly hisuianForms: ReadonlySet<Species> = new Set()

  /**
   * Collection of all pokemons whom would be fossilized.
   */
  public static readonly fossilPokemons: ReadonlySet<Species> = new Set()

  /**
   * Represents a form belonging to a species that is not existent.
   */
  public static readonly EMPTY: FormBelongToSpecies =
    FormBelongToSpeciesImpl.EMPTY

  public abstract readonly species: Species
  public abstract readonly form: number
  public abstract readonly flags: number
  public abstract readonly spriteSuffix: string | null
  public abstract readonly imageSuffix: string | null

  public static builder(): FormBelongToSpeciesBuilder {
    return new FormBelongToSpeciesBuilderImpl()
  }

  public abstract builder(): FormBelongToSpeciesBuilder

  public abstract isDefaultForm(): boolean
  public abstract isMegaForm(): boolean
  public abstract isAlolan(): boolean
  public abstract isGalarian(): boolean
  public abstract isHisuian(): boolean

  public abstract equals(other: any): boolean
  public abstract clone(): FormBelongToSpecies
}
