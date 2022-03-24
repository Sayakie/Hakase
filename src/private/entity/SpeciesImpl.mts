import i18next from 'i18next'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { asserts } from 'io/github/sayakie/hakase/util/asserts.mjs'
import { toStringHelper } from 'io/github/sayakie/hakase/util/function.mjs'

export class SpeciesImpl extends Species {
  /**
   * Creates an EnumSpecies from the given dex number and name.
   *
   * @param {number} dex The pokedex number of the species
   * @param {string} name The name of the species
   * @returns {Species} An instance of EnumSpecies with the given pokedex number and name
   */
  public static of(dex: number, name: string): Species {
    if (dex < 0) {
      const message = `Invalid pokedex. ${name} should have pokedex which must be greater than 0 (was ${dex})`
      throw new RangeError(message)
    }

    return new SpeciesImpl(dex, name)
  }

  public isLegendary(): boolean {
    return Species.legendaries.has(this)
  }

  public isUltraBeast(): boolean {
    return Species.ultrabeasts.has(this)
  }

  public getName(): string {
    return this.name
  }

  public getLocalizedName(): string {
    const key = this.getLocalizationKey()
    const localized = i18next.t(key)
    return localized !== key ? localized : this.getName()
  }

  public getLocalizationKey(): string {
    return `Pixelmon:${this.name.toLowerCase()}.name`
  }

  public getNationalPokedex(): {
    asNumber(): number
    asString(): string
  } {
    return {
      asNumber: () => this.dex,
      asString: () => String(this.dex).padStart(3, `0`),
      toString: () => String(this.dex),
      valueOf: () => this.dex
    } as ReturnType<Species[`getNationalPokedex`]>
  }

  public equals(other: Species): boolean {
    if (this === other) return true
    return (
      this.name === other.getName() &&
      this.dex === other.getNationalPokedex().asNumber()
    )
  }

  public valueOf(): number {
    return this.dex
  }

  public toString(): string {
    return toStringHelper(this)
      .add(`nationalDex`, this.dex)
      .add(`name`, this.name)
      .toString()
  }

  static {
    asserts<Set<Species>>(Species.legendaries)
    asserts<Set<Species>>(Species.ultrabeasts)

    const legendaries = [
      Species.MissingNo,

      /** Generation 1 */
      Species.Articuno,
      Species.Zapdos,
      Species.Moltres,
      Species.Mewtwo,
      Species.Mew,

      /** Generation 2 */
      Species.Raikou,
      Species.Entei,
      Species.Suicune,
      Species.Lugia,
      Species.Hooh,
      Species.Celebi,

      /** Generation 3 */
      Species.Regirock,
      Species.Regice,
      Species.Registeel,
      Species.Latias,
      Species.Latios,
      Species.Kyogre,
      Species.Groudon,
      Species.Rayquaza,
      Species.Jirachi,

      /** Generation 4 */
      Species.Uxie,
      Species.Mesprit,
      Species.Azelf,
      Species.Dialga,
      Species.Palkia,
      Species.Heatran,
      Species.Regigigas,
      Species.Giratina,

      /** Generation 5 */
      Species.Cobalion,
      Species.Terrakion,
      Species.Virizion,
      Species.Tornadus,
      Species.Thundurus,
      Species.Landorus,

      /** Generation 6 */
      Species.Xerneas,
      Species.Yveltal,
      Species.Zygarde,
      Species.Diancie,
      Species.Hoopa,
      Species.Volcanion,

      /** Generation 7 */
      Species.TypeNull,
      Species.Silvally,
      Species.TapuKoko,
      Species.TapuLele,
      Species.TapuBulu,
      Species.TapuFini,
      Species.Cosmog,
      Species.Cosmoem,
      Species.Solgaleo,
      Species.Lunala,
      Species.Necrozma,
      Species.Marshadow,
      Species.Magearna,
      Species.Zeraora,
      Species.Meltan,
      Species.Melmetal,

      /** Generation 8 */
      Species.Zacian,
      Species.Zamazenta,
      Species.Eternatus,
      Species.Kubfu,
      Species.Urshifu,
      Species.Zarude,
      Species.Regieleki,
      Species.Regidrago,
      Species.Glastrier,
      Species.Spectrier,
      Species.Calyrex
    ]

    const ultrabests = [
      Species.Blacephalon,
      Species.Buzzwole,
      Species.Celesteela,
      Species.Guzzlord,
      Species.Poipole,
      Species.Naganadel,
      Species.Nihilego,
      Species.Pheromosa,
      Species.Kartana,
      Species.Stakataka,
      Species.Xurkitree
    ]

    legendaries.forEach(Species.legendaries.add, Species.legendaries)
    ultrabests.forEach(Species.ultrabeasts.add, Species.ultrabeasts)
  }
}
