import { Locale } from 'discord-api-types/v10'
import { SpawnLocation } from 'src/structure/SpawnLocation.js'
import { Type } from 'src/structure/Type.js'

import { Base } from '../interface/Base.js'

export class Bulbasaur extends Base {
  public override readonly nationalDex = 1
  public override readonly localizedNames = {
    ko: `이상해씨`
  }
  public override readonly description = `\u200D`
  public override readonly localizedDescriptions = {}

  public override readonly stats = {
    attack: 49,
    defense: 49,
    hp: 45,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45
  }
  public override readonly catchRate = 45
  public override readonly malePercent = 87
  public override readonly types = [Type.Grass, Type.Poison]
  public override readonly preEvolutions = []
  public override readonly spawnLocations = [SpawnLocation.Land]
  public override readonly evYields = {
    specialAttack: 1
  }
  public override readonly evolutions = [
    {
      conditions: [],
      evoType: `leveling`,
      level: 16,
      to: {
        name: Ivysaur
      }
    }
  ]
  public override readonly abilities = []
  public override readonly eggGroups = []
  public override readonly eggCycles = -1
}
