import { Species } from '../entity/Species.mjs'
import { asserts } from '../util/asserts.mjs'
import type { Cloneable } from '../util/Cloneable.mjs'
import type { Comparable } from '../util/Comparable.mjs'
import { FormFlag } from '../util/Constant.mjs'
import type { ResettableBuilder } from '../util/ResettableBuilder.mjs'
import { checkNonNull, checkState } from '../util/verify.mjs'

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
   * Builds the {@link FormBelongToSpecies} from the values in this builder.
   *
   * @returns {FormBelongToSpecies} The FormBelongToSpecies
   */
  build(): FormBelongToSpecies
}

export abstract class FormBelongToSpecies
  implements Comparable, Cloneable<FormBelongToSpecies>
{
  static readonly #builderImpl = class FormBelongToSpeciesBuilderImpl
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
      checkState(name.length > 0, 'name must be non-empty')
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
      this.$spriteSuffix = spriteSuffix || null

      return this
    }

    public imageSuffix(imageSuffix?: string): this {
      this.$imageSuffix = imageSuffix || null

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

      return new FormBelongToSpecies.#impl(this)
    }
  }

  static readonly #impl = class FormBelongToSpeciesImpl extends FormBelongToSpecies {
    public static readonly EMPTY: FormBelongToSpecies =
      new FormBelongToSpeciesImpl({
        $flags: 0,
        $form: -1,
        $species: null
      })

    public species: Species
    public form: number
    public flags: number
    public spriteSuffix: string | null
    public imageSuffix: string | null

    public constructor(builder: any) {
      super()

      this.species = builder.$species!
      this.form = builder.$form
      this.flags = builder.$flags
      this.spriteSuffix = builder.$spriteSuffix
      this.imageSuffix = builder.$imageSuffix
    }

    public builder(): FormBelongToSpeciesBuilder {
      return new FormBelongToSpecies.#builderImpl().from(this)
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

      if (!(other instanceof FormBelongToSpecies.#impl)) {
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
    FormBelongToSpecies.#impl.EMPTY

  public abstract readonly name: string
  public abstract readonly species: Species
  public abstract readonly form: number
  public abstract readonly flags: number
  public abstract readonly spriteSuffix: string | null
  public abstract readonly imageSuffix: string | null

  public static builder(): FormBelongToSpeciesBuilder {
    return new FormBelongToSpecies.#builderImpl()
  }

  public abstract builder(): FormBelongToSpeciesBuilder

  public abstract isDefaultForm(): boolean
  public abstract isMegaForm(): boolean
  public abstract isAlolan(): boolean
  public abstract isGalarian(): boolean
  public abstract isHisuian(): boolean

  public abstract equals(other: any): boolean
  public abstract clone(): FormBelongToSpecies

  static {
    asserts<Set<Species>>(FormBelongToSpecies.customNormalForms)
    asserts<Set<Species>>(FormBelongToSpecies.megaForms)
    asserts<Set<Species>>(FormBelongToSpecies.megaXYForms)
    asserts<Set<Species>>(FormBelongToSpecies.genderForms)
    asserts<Set<Species>>(FormBelongToSpecies.alolanForms)
    asserts<Set<Species>>(FormBelongToSpecies.galarianForms)
    asserts<Set<Species>>(FormBelongToSpecies.hisuianForms)
    asserts<Set<Species>>(FormBelongToSpecies.fossilPokemons)

    const normalForms = [
      Species.Arbok,
      Species.Bidoof,
      Species.Genesect,
      Species.Meowth,
      Species.Sandile,
      Species.Slowbro,
      Species.Spheal,
      Species.Solgaleo
    ]

    const megaForms = [
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
    ]
    const megaXYForms = [Species.Charizard, Species.Mewtwo]

    const genderForms = [
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
    ]

    const alolanForms = [
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
    ]

    const galarianForms = [
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
    ]

    const hisuianForms = [
      Species.Growlithe,
      Species.Arcanine,
      Species.Voltorb,
      Species.Electrode,
      Species.Braviary
    ]

    const fossilPokemons = [
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
    ]

    normalForms.forEach(
      FormBelongToSpecies.customNormalForms.add,
      FormBelongToSpecies.customNormalForms
    )
    megaForms.forEach(
      FormBelongToSpecies.megaForms.add,
      FormBelongToSpecies.megaForms
    )
    megaXYForms.forEach(
      FormBelongToSpecies.megaXYForms.add,
      FormBelongToSpecies.megaXYForms
    )
    genderForms.forEach(
      FormBelongToSpecies.genderForms.add,
      FormBelongToSpecies.genderForms
    )
    alolanForms.forEach(
      FormBelongToSpecies.alolanForms.add,
      FormBelongToSpecies.alolanForms
    )
    galarianForms.forEach(
      FormBelongToSpecies.galarianForms.add,
      FormBelongToSpecies.galarianForms
    )
    hisuianForms.forEach(
      FormBelongToSpecies.hisuianForms.add,
      FormBelongToSpecies.hisuianForms
    )
    fossilPokemons.forEach(
      FormBelongToSpecies.fossilPokemons.add,
      FormBelongToSpecies.fossilPokemons
    )
  }
}
