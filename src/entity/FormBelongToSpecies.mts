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
  species(species: Species): this
  form(form: number): this
  flags(...flags: number[]): this
  spriteSuffix(spriteSuffix: string): this
  imageSuffix(imageSuffix: string): this
  build(): FormBelongToSpecies
}

export abstract class FormBelongToSpecies
  implements Comparable, Cloneable<FormBelongToSpecies>
{
  /**
   * Collection of all species whom legacy normal forms exist for.
   */
  public static readonly normalForms: ReadonlySet<Species> = new Set()

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

  public abstract equals(other: any): boolean
  public abstract clone(): FormBelongToSpecies
}
