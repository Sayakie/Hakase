type xyz = `x` | `y` | `z` // eslint-disable-line @typescript-eslint/naming-convention
type XYZ<T = number> = { [P in xyz]: T } // eslint-disable-line @typescript-eslint/naming-convention

export type ReadonlyWeakMap<K extends object, V> = Omit<
  WeakMap<K, V>,
  `set` | `delete`
>

export type Time =
  | `Morning`
  | `Day`
  | `Afternoon`
  | `Midnight`
  | `Night`
  | `Dusk`
  | `Dawn`

export type Weather = `Clear` | `Rain` | `Snow` | `Storm`

export type Status =
  | `Burn`
  | `Freeze`
  | `Paralysis`
  | `Poison`
  | `Sleep`
  | `Confusion`

export type Stats =
  | `HP`
  | `Attack`
  | `Defence`
  | `SpecialAttack`
  | `SpecialDefence`
  | `Speed`

export type Type =
  | `Normal`
  | `Fire`
  | `Water`
  | `Electric`
  | `Grass`
  | `Ice`
  | `Fighting`
  | `Poison`
  | `Ground`
  | `Flying`
  | `Psychic`
  | `Bug`
  | `Rock`
  | `Ghost`
  | `Dragon`
  | `Dark`
  | `Steel`
  | `Fairy`
  | `Shiny`
  | `ha` // Hidden Ability

export type Nature =
  | `Hardy`
  | `Serious`
  | `Docile`
  | `Bashful`
  | `Quirky`
  | `Lonely`
  | `Brave`
  | `Adamant`
  | `Naughty`
  | `Bold`
  | `Relaxed`
  | `Impish`
  | `Lax`
  | `Timid`
  | `Hasty`
  | `Jolly`
  | `Naive`
  | `Modest`
  | `Mild`
  | `Quiet`
  | `Rash`
  | `Calm`
  | `Gentle`
  | `Sassy`
  | `Careful`

export type EggGroup =
  | `Mineral`
  | `Monster`
  | `Field`
  | `Dragon`
  | `Ditto`
  | `Water${1 | 2 | 3}`
  | `Bug`
  | `Amorphous`
  | `Flying`
  | `Grass`
  | `Fairy`
  | `Humanlike`
  | `Undiscovered`

export type ExperienceGroup =
  | `Slow`
  | `MediumSlow`
  | `MediumFast`
  | `Fast`
  | `Fluctuating`
  | `Erratic`

export type SpawnLocation =
  | `UnderGround`
  | `Land`
  | `Water`
  | `Air`
  | `AirPersistent`

export interface Stat {
  pixelmonName: string
  pokemon: string
  stats: { readonly [T in Stats]: number }
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
  evYields: { readonly [T in Stats]+?: number }
  boundingBox: BoundingBox
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
  forms?: Record<string, Stat>
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

export interface Aggression {
  timid: number
  passive: number
  aggressive: number
}

export interface BoundingBox {
  width: number
  height: number
  eye_height: number // eslint-disable-line @typescript-eslint/naming-convention
}

export interface RidingOffset {
  standing: XYZ
  flying: XYZ
}

export interface FlyingParameter {
  flyHeightMin: number
  flyHeightMax: number
  flySpeedModifier: number
  flyRefreshRateY: number
  flyRefreshRateXZ: number
  flyRefreshRateSpeed: number
  flightTimeMin: number
  flightTimeMax: number
  flapRate: number
  landingMaterials: Uppercase<`Leaves_and_grass` | `None`>
}

export interface SwimmingParameter {
  depthRangeStart: number
  depthRangeEnd: number
  swimSpeed: number
  decayRate: number
  refreshRate: number
}

export interface MountedFlying {
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

export interface PokeDrop {
  pokemon: string
  form?: number
  maindropdata: string
  maindropmin: number
  maindropmax: number
  raredropdata?: string
  raredropmin?: number
  raredropmax?: number
  optdrop1data?: string
  optdrop1min?: number
  optdrop1max?: number
  optdrop2data?: string
  optdrop2min?: number
  optdrop2max?: number
}

export interface SpawnerConfig {
  blockCategories: Record<string, string[]>
  biomeCategories: Record<string, string[]>
}

export interface SpawnSet {
  id: string
  spawnInfos: SpawnInfo[]
}

export interface SpawnInfo {
  spec: {
    name: string
    level?: number
    form?: number
    ability?: string
    growth?: string
  }
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
  typeID: `pokemon`
  heldItems?: HeldItem[]
  condition: SpawnCondition
  rarity: number
  rarityMultipliers?: Array<{ multiplier: number; condition: SpawnCondition }>
}

export interface SpawnCondition {
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
  weathers?: Array<Capitalize<Weather>>
}

export interface HeldItem {
  itemID: string
  percentChance: number
}
