import { Locale } from 'discord-api-types/v10'

import { Base } from '../interface/Base.js'

export class MissingNo extends Base {
  public override readonly nationalDex = 0
  public override readonly localizedNames = {
    ko: `미싱노`
  }
  public override readonly description = `\u200D`
  public override readonly localizedDescriptions = {}

  public override readonly stats = {
    attack: -1,
    defense: -1,
    hp: -1,
    specialAttack: -1,
    specialDefense: -1,
    speed: -1
  }
  public override readonly catchRate = -1
  public override readonly types = []
  public override readonly preEvolutions = []
  public override readonly spawnLocations = []
  public override readonly evYields = {}
  public override readonly evolutions = []
  public override readonly abilities = []
  public override readonly eggGroups = []
  public override readonly eggCycles = -1
}
