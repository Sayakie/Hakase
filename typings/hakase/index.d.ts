declare type Locale = 'en-US' | 'ko'

declare interface GuildConfig {
  channels: string[]
  locale: Locale
  prefix: string
  version: string
}

declare type Nullable<T> = T | null
declare type xyz = 'X' | 'Y' | 'Z' // eslint-disable-line @typescript-eslint/naming-convention
declare type XYZ<T = number> = { [P in xyz]: T } // eslint-disable-line @typescript-eslint/naming-convention

declare type Stat =
  | 'HP'
  | 'Attack'
  | 'Defence'
  | 'SpecialAttack'
  | 'SpecialDefence'
  | 'Speed'

declare type Type =
  | 'ha'
  | Capitalize<
      | 'Normal'
      | 'Fire'
      | 'Water'
      | 'Electric'
      | 'Grass'
      | 'Ice'
      | 'Fighting'
      | 'Poison'
      | 'Ground'
      | 'Flying'
      | 'Psychic'
      | 'Bug'
      | 'Rock'
      | 'Ghost'
      | 'Dragon'
      | 'Dark'
      | 'Steel'
      | 'Fairy'
      | 'Shiny'
    >

declare type EggGroup = Capitalize<
  | 'Mineral'
  | 'Monster'
  | 'Field'
  | 'Dragon'
  | 'Ditto'
  | `Water${1 | 2 | 3}`
  | 'Bug'
  | 'Amorphous'
  | 'Flying'
  | 'Grass'
  | 'Fairy'
  | 'Humanlike'
  | 'Undiscovered'
>

declare type ExperienceGroup = Capitalize<
  'Slow' | 'MediumSlow' | 'MediumFast' | 'Fast' | 'Fluctuating' | 'Erratic'
>

declare type SpawnLocation = Capitalize<
  'UnderGround' | 'Land' | 'Water' | 'Air' | 'AirPersistent'
>

declare interface BaseStats {
  pixelmonName: string
  pokemon: string
  stats: { readonly [T in Stat]: number }
  catchRate: number
  malePercent?: number
  spawnLevel: number
  spawnLevelRange?: number
  baseExp?: number
  baseFriendship?: number
  types: Type[]
  weight: number
  height: number
  preEvolutions: string[]
  experienceGroup: ExperienceGroup
  aggression: Aggression
  spawnLocations: SpawnLocation[]
  evYields: { readonly [T in Stat]+?: number }
  bounding_box: BoundingBox // eslint-disable-line @typescript-eslint/naming-convention
  evolutions: Evolution[]
  abilities:
    | [string, string]
    | [string, string, string]
    | [string, null, string]
  eggGroups: EggGroup[]
  eggCycles: number
  levelUpMoves?: Record<string, string[]>
  tutorMoves?: string[]
  eggMoves?: string[]
  forms?: Record<string, BaseStats>
  form?: number
  hmMoves?: []
  trMoves?: string[]
  tmMoves1?: string[]
  tmMoves2?: string[]
  tmMoves3?: string[]
  tmMoves4?: string[]
  tmMoves5?: string[]
  tmMoves6?: string[]
  tmMoves7?: string[]
  tmMoves8?: string[]
  transferMoves?: string[]
  isRideable?: boolean
  ridingOffsets?: RidingOffset
  canFly?: boolean
  flyingParameters?: FlyingParameter
  mountedFlying?: MountedFlying
  canSurf?: boolean
  swimmingParameters?: SwimmingParameter
}

declare type NestedBaseStats = Partial<
  Omit<
    BaseStats,
    | 'pixelmonName'
    | 'pokemon'
    | 'catchRate'
    | 'malePercent'
    | 'experienceGroup'
    | 'aggression'
    | 'eggCycles'
    | 'forms'
  >
> & { form: number }

declare interface Evolution {
  level?: number
  to: {
    name: string
    form?: number
  }
  item?: { itemID: string }
  conditions: EvolutionCondition[]
  evoType: EvolutionType
  moves?: ReadonlyArray<string>
}

declare type Time =
  | 'Morning'
  | 'Day'
  | 'Afternoon'
  | 'MidNight'
  | 'Night'
  | 'Dusk'
  | 'Dawn'

declare type EvolutionType =
  | 'leveling'
  | 'interact'
  | 'trade'
  | 'ticking'
  | 'Unknown'

// TODO - its messy up
declare type EvolutionCondition =
  | {
      evoConditionType: 'evolutionScroll'
      evolutionScoll: 'Darkness' | 'Waters'
      maxRangeSquared: 64
    }
  | {
      evoConditionType: 'time'
      time: Uppercase<Time>
    }
  | {
      evoConditionType: 'friendship'
      friendship: number
    }
  | {
      evoConditionType: 'biome'
      biomes: string[]
    }
  | {
      evoConditionType: 'move'
      attackIndex: number
    }
  | {
      evoConditionType: 'nature'
      natures: string[]
    }
  | {
      evoConditionType: 'ores'
      ores: number
    }
  | {
      evoConditionType: 'gender'
      genders: ['Male' | 'Female']
    }
  | {
      evoConditionType: 'evolutionRock'
      evolutionRock: 'IcyRock' | 'MossyRock'
      maxRangeSquared: 100
    }
  | {
      evoConditionType: 'weather'
      weather: Uppercase<'Rain'>
    }
  | {
      evoConditionType: 'highAltitude'
      minAltitude: 127
    }
  | {
      evoConditionType: 'heldItem'
      item: {
        itemID: string
      }
    }
  | {
      evoConditionType: 'party'
      withPokemon?: string[]
      withTypes?: Type[]
      withForms?: ['ALOLAN' | 'GALAR']
    }
  | {
      evoConditionType: 'chance'
      chance: number
    }
  | {
      evoConditionType: 'statRatio'
      stat1: Stat
      stat2: Stat
      ratio: number
    }
  | {
      evoConditionType: 'moveType'
      type: Type
    }
  | {
      evoConditionType: 'healthAbsence'
      health: number
    }
  | {
      evoConditionType: 'withinStructure'
      structure: string | 'Temple'
    }
  | {
      evoConditionType: 'invert'
      condition: EvolutionCondition
    }
  | {
      evoConditionType: 'status'
      type: 'Burn'
    }

declare interface Aggression {
  timid: number
  passive: number
  aggressive: number
}

declare interface BoundingBox {
  width: number
  height: number
  eye_height: number // eslint-disable-line @typescript-eslint/naming-convention
}

declare interface RidingOffset {
  standing: XYZ
  moving: XYZ
}

declare interface FlyingParameter {
  flyHeightMin: number
  flyHeightMax: number
  flySpeedModifier: number
  flyRefreshRateY: number
  flyRefreshRateXZ: number
  flyRefreshRateSpeed: number
  flightTimeMin: number
  flightTimeMax: number
  flapRate: number
  landingMaterials: 'LEAVES_AND_GRASS'
}

declare interface SwimmingParameter {
  depthRangeStart: number
  depthRangeEnd: number
  swimSpeed: number
  decayRate: number
  refreshRate: number
}

declare interface MountedFlying {
  upperAngleLimit: number
  lowerAngleLimit: number
  maxFlySpeed: number
  decelerationRate: number
  hoverDecelerationRate: number
  accelerationRate: number
  strafeAccelerationRate: number
  strafeRollConversion: number
  turnRate: number
  pitchRate: number
  stayshorizontalflying?: boolean
}

declare interface PokeDrop {
  pokemon: string
  form?: number
  maindropdata: string
  maindropmin: number
  maindropmax: number
  raredropdata?: string
  raredropmin: number
  raredropmax: number
  optdrop1data?: string
  optdrop1min: number
  optdrop1max: number
  optdrop2data?: string
  optdrop2min: number
  optdrop2max: number
}

declare interface SpawnerConfig {
  blockCategories: Record<string, string[]>
  biomeCategories: Record<string, string[]>
}

declare interface SpawnSet {
  id: string
  spawnInfos: SpawnInfo[]
}

declare interface SpawnInfo {
  spec: { name: string; form?: number; ability?: string; growth?: string }
  stringLocationTypes: Array<
    | 'Land'
    | 'Sweet Scent'
    | 'Tree Top'
    | 'Headbutt'
    | 'Water'
    | 'Air'
    | 'Seafloor'
    | 'Rock Smash'
    | 'Underground'
    | 'Underground Water'
    | 'Forage'
    | 'Surface Water'
    | 'Lava Floor'
    | 'Indoors'
  >
  minLevel: number
  maxLevel: number
  typeID: 'pokemon'
  heldItems?: HeldItem[]
  condition: SpawnCondition
  rarity: number
  rarityMultipliers?: Array<{ multiplier: number; condition: SpawnCondition }>
}

declare interface SpawnCondition {
  times?: Array<Uppercase<Time>>
  stringBiomes?: string[]
  minX?: number
  minY?: number
  minZ?: number
  maxX?: number
  maxY?: number
  maxZ?: number
  baseBlocks?: string[]
  dimensions?: Array<string | number>
  maxLightLevel?: number
  neededNearbyBlocks?: string[]
  weathers?: Array<Capitalize<'CLEAR' | 'RAIN' | 'STORM'>>
}

declare interface HeldItem {
  itemID: string
  percentChance: number
}
