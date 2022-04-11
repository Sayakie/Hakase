import { Species } from '../entity/Species.js'
import type { Cloneable } from '../util/Cloneable.js'
import type { Comparable } from '../util/Comparable.js'
import { FormFlag } from '../util/Constant.js'
import type { ResettableBuilder } from '../util/ResettableBuilder.js'
import { checkNonNull, checkState } from '../util/verify.js'

export interface FormBelongToSpeciesBuilder
  extends ResettableBuilder<FormBelongToSpecies, FormBelongToSpeciesBuilder> {
  /**
   * Sets the name of this form.
   *
   * @param {string} name The name of this form
   * @returns {this} The builder, for chaining
   */
  name(name: string): this

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
   * Builds the {@link Collections} from the values in this builder.
   *
   * @returns {FormBelongToSpecies} The FormBelongToSpecies
   */
  build(): FormBelongToSpecies
}

export class UnsafeFormBelongToSpeciesBuilder
  implements FormBelongToSpeciesBuilder
{
  public $name: string
  public $species: Species | null
  public $form: number
  public $flags: number
  public $spriteSuffix: string | null
  public $imageSuffix: string | null

  public constructor() {
    this.$name = ``
    this.$species = null
    this.$form = -1
    this.$flags = 0
    this.$spriteSuffix = null
    this.$imageSuffix = null
  }

  public name(name: string): this {
    checkState(name.length > 0, `name must be non-empty`)
    this.$name = name

    return this
  }

  public species(species: Species): this {
    this.$species = species

    return this
  }

  public form(form: number): this {
    checkState(form > -1, `form must be greater than -1 (was ${form})`)
    this.$form = form

    return this
  }

  public flags(...flags: number[]): this {
    this.$flags |= flags.reduce((acc, flag) => {
      checkState(flag > -1, `flag must be greater than -1 (was ${flag})`)
      return acc | flag
    }, 0)

    return this
  }

  public spriteSuffix(spriteSuffix?: string): this {
    this.$spriteSuffix = spriteSuffix ?? null

    return this
  }

  public imageSuffix(imageSuffix?: string): this {
    this.$imageSuffix = imageSuffix ?? null

    return this
  }

  public from(value: FormBelongToSpecies): this {
    this.$name = value.name
    this.$species = value.species
    this.$form = value.form
    this.$flags = value.flags
    this.$spriteSuffix = value.spriteSuffix
    this.$imageSuffix = value.imageSuffix

    return this
  }

  public reset(): this {
    this.$name = ``
    this.$species = null
    this.$form = -1
    this.$flags = 0
    this.$spriteSuffix = null
    this.$imageSuffix = null

    return this
  }

  public build(): FormBelongToSpecies {
    checkState(this.$name.length > 0, 'name must be non-empty')
    checkNonNull(this.$species, 'species must not be null')
    checkState(this.$form > -1, 'form must be greater than -1')

    this.$spriteSuffix ??= `-${this.$name}`
    this.$imageSuffix ??= `-${this.$name}`

    return this.unsafeBuild()
  }

  public unsafeBuild(): FormBelongToSpecies {
    return new UnsafeFormBelongToSpecies(this)
  }
}

export interface FormBelongToSpecies
  extends Comparable,
    Cloneable<FormBelongToSpecies> {
  readonly name: string
  readonly species: Species
  readonly form: number
  readonly flags: number
  readonly spriteSuffix: string | null
  readonly imageSuffix: string | null

  builder(): FormBelongToSpeciesBuilder

  isDefaultForm(): boolean
  isMegaForm(): boolean
  isAlolan(): boolean
  isGalarian(): boolean
  isHisuian(): boolean

  equals(other: any): boolean
  clone(): FormBelongToSpecies
}

export class UnsafeFormBelongToSpecies implements FormBelongToSpecies {
  public name: string
  public species: Species
  public form: number
  public flags: number
  public spriteSuffix: string | null
  public imageSuffix: string | null

  public constructor(builder: UnsafeFormBelongToSpeciesBuilder) {
    this.name = builder.$name
    this.species = builder.$species!
    this.form = builder.$form
    this.flags = builder.$flags
    this.spriteSuffix = builder.$spriteSuffix
    this.imageSuffix = builder.$imageSuffix
  }

  public builder(): FormBelongToSpeciesBuilder {
    return new UnsafeFormBelongToSpeciesBuilder().from(this)
  }

  public isDefaultForm(): boolean {
    return this.compareForm(FormFlag.DefaultForm)
  }

  public isMegaForm(): boolean {
    return this.compareForm(FormFlag.MegaForm)
  }

  public isAlolan(): boolean {
    return this.compareForm(FormFlag.AlolanForm)
  }

  public isGalarian(): boolean {
    return this.compareForm(FormFlag.GalarianForm)
  }

  public isHisuian(): boolean {
    return this.compareForm(FormFlag.HisuianForm)
  }

  public equals(other: any): boolean {
    if (this === other) {
      return true
    }

    if (!(other instanceof UnsafeFormBelongToSpecies)) {
      return false
    }

    return this.species === other.species && this.form === other.form
  }

  public clone(): FormBelongToSpecies {
    return this.builder().build()
  }

  private compareForm(formFlag: number): boolean {
    return (this.flags & formFlag) === formFlag
  }
}

const empty = new UnsafeFormBelongToSpeciesBuilder().unsafeBuild()

export const FormBelongToSpecies = {
  builder(): FormBelongToSpeciesBuilder {
    return new UnsafeFormBelongToSpeciesBuilder()
  },

  empty(): FormBelongToSpecies {
    return empty
  }
}

export type Collections = Readonly<{
  /**
   * Set of species whom have custom sprite suffixes.
   *
   * @readonly
   */
  customNormalForms: ReadonlySet<Species>

  /**
   * Set of species whom have mega forms.
   *
   * @readonly
   */
  megaForms: ReadonlySet<Species>

  /**
   * Set of species whom have mega-x, mega-y forms.
   *
   * @readonly
   */
  megaXYForms: ReadonlySet<Species>

  /**
   * Set of species whom have alolan forms.
   *
   * @readonly
   */
  alolanForms: ReadonlySet<Species>

  /**
   * Set of species whom have galarian forms.
   *
   * @readonly
   */
  galarianForms: ReadonlySet<Species>

  /**
   * Set of species whom have hisuian forms.
   *
   * @readonly
   */
  hisuianForms: ReadonlySet<Species>

  genderPokemons: ReadonlySet<Species>
  fossilPokemons: ReadonlySet<Species>
}>

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Collections: Collections = {
  customNormalForms: new Set([
    Species.Arbok,
    Species.Bidoof,
    Species.Genesect,
    Species.Meowth,
    Species.Sandile,
    Species.Slowbro,
    Species.Spheal,
    Species.Solgaleo
  ]),
  megaForms: new Set([
    Species.Abomasnow,
    Species.Absol,
    Species.Aerodactyl,
    Species.Aggron,
    Species.Alakazam,
    Species.Altaria,
    Species.Ampharos,
    Species.Audino,
    Species.Banette,
    Species.Beedrill,
    Species.Blastoise,
    Species.Blaziken,
    Species.Camerupt,
    Species.Diancie,
    Species.Gallade,
    Species.Garchomp,
    Species.Gardevoir,
    Species.Gengar,
    Species.Glalie,
    Species.Gyarados,
    Species.Heracross,
    Species.Houndoom,
    Species.Kangaskhan,
    Species.Latias,
    Species.Latios,
    Species.Lopunny,
    Species.Lucario,
    Species.Manectric,
    Species.Mawile,
    Species.Medicham,
    Species.Metagross,
    Species.Pidgeot,
    Species.Pinsir,
    Species.Rayquaza,
    Species.Sableye,
    Species.Salamence,
    Species.Sceptile,
    Species.Scizor,
    Species.Sharpedo,
    Species.Slowbro,
    Species.Steelix,
    Species.Swampert,
    Species.Tyranitar,
    Species.Venusaur
  ]),
  megaXYForms: new Set([Species.Charizard, Species.Mewtwo]),
  alolanForms: new Set([
    Species.Diglett,
    Species.Dugtrio,
    Species.Exeggutor,
    Species.Geodude,
    Species.Golem,
    Species.Graveler,
    Species.Grimer,
    Species.Marowak,
    Species.Meowth,
    Species.Muk,
    Species.Ninetales,
    Species.Persian,
    Species.Raichu,
    Species.Raticate,
    Species.Rattata,
    Species.Sandshrew,
    Species.Sandslash,
    Species.Vulpix
  ]),
  galarianForms: new Set([
    Species.Articuno,
    Species.Corsola,
    Species.Darumaka,
    Species.Farfetchd,
    Species.Linoone,
    Species.Meowth,
    Species.Moltres,
    Species.MrMime,
    Species.Ponyta,
    Species.Rapidash,
    Species.Slowbro,
    Species.Slowking,
    Species.Slowpoke,
    Species.Stunfisk,
    Species.Weezing,
    Species.Yamask,
    Species.Zapdos,
    Species.Zigzagoon
  ]),
  hisuianForms: new Set([
    Species.Growlithe,
    Species.Arcanine,
    Species.Voltorb,
    Species.Electrode,
    Species.Braviary
  ]),
  genderPokemons: new Set([
    Species.Combee,
    Species.Frillish,
    Species.Hippopotas,
    Species.Hippowdon,
    Species.Indeedee,
    Species.Jellicent,
    Species.Meowstic,
    Species.Pyroar,
    Species.Unfezant,
    Species.Wobbuffet
  ]),
  fossilPokemons: new Set([
    Species.Omanyte,
    Species.Kabuto,
    Species.Aerodactyl,
    Species.Lileep,
    Species.Anorith,
    Species.Cranidos,
    Species.Shieldon,
    Species.Tirtouga,
    Species.Archen,
    Species.Tyrunt,
    Species.Amaura,
    Species.Dracozolt,
    Species.Arctozolt,
    Species.Dracovish,
    Species.Arctovish
  ])
}
