import type {
  AbilityZip,
  BattleStat,
  EggGroup,
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

  #evolutions: string[]

  #evYields: { [T in BattleStat]+?: number }

  public constructor(species: PokemonSpecies, jsonData: JsonForm) {
    const movelCollectionValidator = s.object({
      eggMoves: s.array(s.string).unique,
      hmMoves: s.array(s.string).unique,
      levelUpMoves: s.array(
        s.object({
          attacks: s.array(s.string).unique,
          level: s.number.positive.safeInt
        })
      ),
      tmMoves: s.array(s.string).unique,
      tmMoves1: s.array(s.string).unique,
      tmMoves2: s.array(s.string).unique,
      tmMoves3: s.array(s.string).unique,
      tmMoves4: s.array(s.string).unique,
      tmMoves5: s.array(s.string).unique,
      tmMoves6: s.array(s.string).unique,
      tmMoves7: s.array(s.string).unique,
      tmMoves8: s.array(s.string).unique,
      trMoves: s.array(s.string).unique,
      transferMoves: s.array(s.string).unique,
      tutorMoves: s.array(s.string).unique
    })

    const abilityZipValidator = s.object({
      abilities: s.array(s.string),
      hiddenAbilities: s.array(s.string)
    })

    const battleStatsValidator = s.object({
      attack: s.number,
      defense: s.number,
      hp: s.number,
      specialAttack: s.number,
      specialDefense: s.number,
      speed: s.number
    })

    const genderPropertiesValidator = s.array(
      s.object({
        gender: s.array(s.string).unique,
        palettes: s.array(
          s.object({ name: s.string, particle: s.string, sprite: s.string, texture: s.string })
        )
      })
    )

    this.#species = species

    this.#name = s.string.parse(jsonData.name)
    this.#experienceGroup = s.string.parse(jsonData.experienceGroup)
    this.#moves = movelCollectionValidator.parse(jsonData.moves)
    this.#abilities = abilityZipValidator.parse(jsonData.abilities)
    this.#battleStats = battleStatsValidator.parse(jsonData.battleStats)
    this.#tags = s.array(s.string).unique.parse(jsonData.tags)
    this.#possibleGenders = s.array(s.string).unique.parse(jsonData.possibleGenders)
    this.#genderProperties = genderPropertiesValidator.parse(jsonData.genderProperties)
    this.#eggGroups = s.array(s.string).unique.parse(jsonData.eggGroups)
    this.#types = s.array(s.string).unique.parse(jsonData.types)
    this.#preEvolutions = s.array(s.string).unique.parse(jsonData.preEvolutions)
    this.#defaultBaseForm = s.string.parse(jsonData.defaultBaseForm)
    this.#eggCycles = s.number.positive.safeInt.parse(jsonData.eggCycles)
    this.#catchRate = s.number.positive.safeInt.parse(jsonData.catchRate)
    this.#malePercentage = s.number.positive.safeInt.parse(jsonData.malePercentage)
    this.#evolutions = s.array(s.string).unique.parse(jsonData.evolutions)
    this.#evYields = battleStatsValidator.partial.parse(jsonData.evYields)
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

  public get evolutions(): ReadonlyArray<string> {
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

    const key = `Pixelmon:${type}.form.${this.name.toLowerCase()}`

    const translation: Translation = {
      key: () => key,
      with: locale => container.i18n.format(locale, key)
    }

    Reflect.set(translation, `toString`, key)
    Object.freeze(translation)

    return translation
  }
}
