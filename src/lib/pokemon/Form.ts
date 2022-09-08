import type {
  AbilityZip,
  BattleStat,
  EggGroup,
  Evolution,
  ExperienceGroup,
  Form as JsonForm,
  Gender,
  GenderProperties,
  MoveCollection,
  Type
} from '@internal/pixelmon'
import { container } from '@sapphire/pieces'
import { s } from '@sapphire/shapeshift'

import type { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import { abilityZipValidator } from '#lib/utils/shapeshiftValidators/abilityzipValidator.js'
import { battleStatsValidator } from '#lib/utils/shapeshiftValidators/battleStatsValidator.js'
import { evolutionValidator } from '#lib/utils/shapeshiftValidators/evolutionValidator.js'
import { genderPropertiesValidator } from '#lib/utils/shapeshiftValidators/genderPropertiesValidator.js'
import { moveCollectionValidator } from '#lib/utils/shapeshiftValidators/moveCollectionValidator.js'
import type { Translatable, Translation } from '#lib/utils/Translatable.js'

const GenericForms: string[] = [
  `noform`,
  `mega`,
  `megax`,
  `megay`,
  `primal`,
  `dynamax`,
  `gmax`,
  `gigantamax`,
  `normal`,
  `alolan`,
  `galarian`,
  `hisuian`
].map(it => it.toLowerCase())

export class Form implements Translatable {
  #species: PokemonSpecies

  #name: string

  #experienceGroup: ExperienceGroup

  #moves: MoveCollection

  #abilities: AbilityZip

  #battleStats: { [T in BattleStat]: number }

  #tags: string[]

  #possibleGenders: Array<Uppercase<Gender>>

  #genderProperties: GenderProperties[]

  #eggGroups: EggGroup[]

  #types: Type[]

  #preEvolutions: string[]

  #defaultBaseForm: string

  #eggCycles: number

  #catchRate: number

  #malePercentage: number

  #evolutions: Evolution[]

  #evYields: { [T in BattleStat]+?: number }

  public constructor(species: PokemonSpecies, jsonData: JsonForm) {
    this.#species = species

    this.#name = s.string.parse(jsonData.name)
    this.#experienceGroup = s.string.nullish.parse(jsonData.experienceGroup)
    this.#moves = moveCollectionValidator.nullish.parse(jsonData.moves)
    this.#abilities = abilityZipValidator.nullish.parse(jsonData.abilities)
    this.#battleStats = battleStatsValidator.nullish.parse(jsonData.battleStats)
    this.#tags = s.array(s.string).unique.nullish.parse(jsonData.tags)
    this.#possibleGenders = s.array(s.string).unique.nullish.parse(jsonData.possibleGenders)
    this.#genderProperties = genderPropertiesValidator.parse(jsonData.genderProperties)
    this.#eggGroups = s.array(s.string).unique.nullish.parse(jsonData.eggGroups)
    this.#types = s.array(s.string).unique.nullish.parse(jsonData.types)
    this.#preEvolutions = s.array(s.string).unique.nullish.parse(jsonData.preEvolutions)
    this.#defaultBaseForm = s.string.nullish.parse(jsonData.defaultBaseForm)
    this.#eggCycles = s.number.positive.safeInt.nullish.parse(jsonData.eggCycles)
    this.#catchRate = s.number.positive.safeInt.nullish.parse(jsonData.catchRate)
    this.#malePercentage = s.number
      .greaterThanOrEqual(-1)
      .lessThanOrEqual(100)
      .nullish.parse(jsonData.malePercentage)
    this.#evolutions = evolutionValidator.nullish.parse(jsonData.evolutions)
    this.#evYields = battleStatsValidator.partial.nullish.parse(jsonData.evYields)
  }

  public get species(): PokemonSpecies {
    return this.#species
  }

  public get name(): string {
    return this.#name
  }

  public get experienceGroup(): ExperienceGroup {
    return this.#experienceGroup
  }

  public get moves(): MoveCollection {
    return this.#moves
  }

  public get abilities(): AbilityZip {
    return this.#abilities
  }

  public get battleStats(): { readonly [T in BattleStat]: number } {
    const { ...battleStats } = this.#battleStats

    return Object.freeze(battleStats)
  }

  public get tags(): string[] {
    return [...this.#tags]
  }

  public get possibleGenders(): ReadonlyArray<Uppercase<Gender>> {
    return [...this.#possibleGenders]
  }

  public get genderProperties(): ReadonlyArray<GenderProperties> {
    return [...this.#genderProperties]
  }

  public get eggGroups(): ReadonlyArray<EggGroup> {
    return [...this.#eggGroups]
  }

  public get types(): ReadonlyArray<Type> {
    return [...this.#types]
  }

  public get preEvolutions(): ReadonlyArray<string> {
    return [...this.#preEvolutions]
  }

  public get defaultBaseForm(): string {
    return this.#defaultBaseForm
  }

  public get eggCycles(): number {
    return this.#eggCycles
  }

  public get catchRate(): number {
    return this.#catchRate
  }

  public get malePercentage(): number {
    return this.#malePercentage
  }

  public get evolutions(): ReadonlyArray<Evolution> {
    return [...this.#evolutions]
  }

  public get evYields(): { readonly [T in BattleStat]+?: number } {
    const { ...evYields } = this.#evYields

    return Object.freeze(evYields)
  }

  public isLegendary(): boolean {
    return this.tags.includes(`legendary`)
  }

  public isMythical(): boolean {
    return this.tags.includes(`mythical`)
  }

  public isUltraBeast(): boolean {
    return this.tags.includes(`ultrabeast`)
  }

  public isTemporary(): boolean {
    return this.tags.includes(`temp`)
  }

  public translation(): Translation {
    const type =
      this.isTemporary() || GenericForms.includes(this.name.toLowerCase())
        ? `generic`
        : this.species.name.toLowerCase()

    const key = `${type}.form.${this.name.toLowerCase()}`

    const translation: Translation = {
      key: () => key,
      with: (locale, namespace = `Pixelmon:`) => container.i18n.format(locale, namespace + key)
    }

    Reflect.set(translation, `toString`, key)
    Object.freeze(translation)

    return translation
  }
}
