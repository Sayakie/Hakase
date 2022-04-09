import type { Locale } from 'discord-api-types/v10'
import { Species } from 'src/entity/Species.js'

import { Util } from '../../index.js'
import type { SpawnLocation } from '../../structure/SpawnLocation.js'
import type { Type } from '../../structure/Type.js'
import { Version } from '../../util/Constant.js'

type Stats =
  | `attack`
  | `defense`
  | `hp`
  | `specialAttack`
  | `specialDefense`
  | `speed`

export abstract class Base {
  public readonly name: string = this.constructor.name
  public readonly localizedNames: Readonly<{
    [T in Locale]+?: string
  }> = {}
  public readonly version: Version = Version.core

  public readonly form: number = 0
  public readonly forms: Record<number, Omit<Base, `forms`>> = {}
  public readonly malePercent: number = -1

  public readonly levelUpMoves: Record<string, string> = {}
  public readonly tutorMoves: string[] = []
  public readonly eggMoves: string[] = []
  public readonly trMoves: string[] = []
  public readonly tmMoves1: string[] = []
  public readonly tmMoves2: string[] = []
  public readonly tmMoves3: string[] = []
  public readonly tmMoves4: string[] = []
  public readonly tmMoves5: string[] = []
  public readonly tmMoves6: string[] = []
  public readonly tmMoves7: string[] = []
  public readonly tmMoves8: string[] = []
  public readonly transferMoves: string[] = []

  public abstract readonly nationalDex: number
  public abstract readonly description: string
  public abstract readonly localizedDescriptions: Readonly<{
    [T in Locale]+?: string
  }>

  public abstract readonly stats: { [T in Stats]: number }
  public abstract readonly catchRate: number
  public abstract readonly types: Type[]
  public abstract readonly preEvolutions: Array<typeof Base>
  public abstract readonly spawnLocations: SpawnLocation[]
  public abstract readonly evYields: { readonly [T in Stats]+?: number }
  public abstract readonly evolutions: Evolution[]
  public abstract readonly abilities: string[]
  public abstract readonly eggGroups: EggGroup[]
  public abstract readonly eggCycles: number

  public isLegendary(): boolean {
    return false
    // return Species.getLegendaries().has(this)
  }

  public isUltraBeast(): boolean {
    return false
  }

  public getName(): string {
    return this.name
  }

  public getLocalizedName(locale: Locale): string | null {
    return this.localizedNames[locale] ?? null
  }

  public getNationalPokedex(): {
    asNumber(): number
    asString(): string
  } {
    return {
      asNumber: () => this.nationalDex,
      asString: () => String(this.nationalDex).padStart(3, `0`),
      toString: () => String(this.nationalDex),
      valueOf: () => this.nationalDex
    } as ReturnType<typeof Base.prototype.getNationalPokedex>
  }

  public valueOf(): number {
    return this.nationalDex
  }

  public toString(): string {
    return Util.toStringHelper(this)
      .add('nationalDex', this.nationalDex)
      .add('name', this.name)
      .toString()
  }
}
