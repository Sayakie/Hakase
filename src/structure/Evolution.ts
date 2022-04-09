import type { Nature, Status, Time, Type, Weather } from '../@types.js'
import type { Base as SpeciesSpec } from '../species/interface/Base.js'

export interface Evolution {
  level?: number
  to: {
    name: string
    form?: number
  }
  item?: { itemID: string }
  conditions: EvolutionCondition[]
  evoType: EvolutionType
  moves?: string[]
}

export type EvolutionType =
  | `leveling`
  | `interact`
  | `trade`
  | `ticking`
  | `unknown`

export type EvolutionCondition =
  | {
      evoConditionType: `evolutionScroll`
      evolutionScoll: string // 'Darkness' | 'Waters'
      maxRangeSquared: number // 64
    }
  | {
      evoConditionType: `time`
      time: Uppercase<Time>
    }
  | {
      evoConditionType: `friendship`
      friendship: number
    }
  | {
      evoConditionType: `biome`
      biomes: string[]
    }
  | {
      evoConditionType: `move`
      attackIndex: number
    }
  | {
      evoConditionType: `nature`
      natures: Nature[]
    }
  | {
      evoConditionType: `ores`
      ores: number // 400
    }
  | {
      evoConditionType: `gender`
      genders: [`Male` | `Female`]
    }
  | {
      evoConditionType: `evolutionRock`
      evolutionRock: `IcyRock` | `MossyRock`
      maxRangeSquared: number // 100
    }
  | {
      evoConditionType: `weather`
      weather: Uppercase<Weather>
    }
  | {
      evoConditionType: `highAltitude`
      minAltitude: number // 127
    }
  | {
      evoConditionType: `heldItem`
      item: {
        itemID: string
      }
    }
  | {
      evoConditionType: `party`
      withPokemon: string[]
      withTypes: Type[]
      withForms: [
        | `ALOLAN`
        | `GALAR`
        | `HISUIAN`
        /* Magby forms: */
        | `COPPER_CHLORIDE`
        | `CUPRIC_CHLORIDE`
        | `LITHIUM_CHLORIDE`
        | `MAGNESIUM_SULFIDE`
        | `MANGANESE_CHLORIDE`
        | `POTASSIUM_CHLORIDE`
        | `SODIUM_CARBONATE`
        | `CALCIUM_CARBONATE`
      ]
    }
  | {
      evoConditionType: `chance`
      chance: number // 0 ~ 1
    }
  | {
      evoConditionType: `statRatio`
      stat1: SpeciesSpec
      stat2: SpeciesSpec
      ratio: number
    }
  | {
      evoConditionType: `moveType`
      type: Type
    }
  | {
      evoConditionType: `healthAbsence`
      health: number
    }
  | {
      evoConditionType: `withinStructure`
      structure: string | 'Temple'
    }
  | {
      evoConditionType: `invert`
      condition: EvolutionCondition
    }
  | {
      evoConditionType: `status`
      type: Status
    }
  | {
      evoConditionType: `unknown`
    }
