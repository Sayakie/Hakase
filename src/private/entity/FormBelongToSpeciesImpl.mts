import type { FormBelongToSpeciesBuilder } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { asserts } from 'io/github/sayakie/hakase/util/asserts.mjs'
import {
  checkNonNull,
  checkState
} from 'io/github/sayakie/hakase/util/verify.mjs'

export class FormBelongToSpeciesBuilderImpl
  implements FormBelongToSpeciesBuilder
{
  public $species: Species | null
  public $form: number
  public $flags: number

  public constructor() {
    this.$species = null
    this.$form = -1
    this.$flags = 0
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

  public flags(flags: number): this {
    this.$flags = flags

    return this
  }

  public from(value: FormBelongToSpecies): this {
    this.$species = value.species
    this.$form = value.form
    this.$flags = value.flags

    return this
  }

  public reset(): this {
    this.$species = null
    this.$form = -1
    this.$flags = 0

    return this
  }

  public build(): FormBelongToSpecies {
    checkNonNull(this.$species, 'species must not be null')
    checkState(this.$form > -1, 'form must be greater than -1')

    return new FormBelongToSpeciesImpl(this)
  }
}

export class FormBelongToSpeciesImpl extends FormBelongToSpecies {
  public static readonly EMPTY: FormBelongToSpecies =
    new FormBelongToSpeciesImpl({
      $flags: 0,
      $form: -1,
      $species: null
    } as FormBelongToSpeciesBuilderImpl)

  public species: Species
  public form: number
  public flags: number

  public constructor(builder: FormBelongToSpeciesBuilderImpl) {
    super()

    this.species = builder.$species!
    this.form = builder.$form
    this.flags = builder.$flags
  }

  public builder(): FormBelongToSpeciesBuilderImpl {
    return new FormBelongToSpeciesBuilderImpl().from(this)
  }

  public equals(other: any): boolean {
    if (this === other) {
      return true
    }

    if (!(other instanceof FormBelongToSpeciesImpl)) {
      return false
    }

    return this.species === other.species && this.form === other.form
  }

  public clone(): FormBelongToSpecies {
    return this.builder().build()
  }

  static {
    asserts<Set<Species>>(FormBelongToSpecies.normalForms)
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
      FormBelongToSpecies.normalForms.add,
      FormBelongToSpecies.normalForms
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
