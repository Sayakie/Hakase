declare module '@internal/pixelmon' {
  type Time = `Morning` | `Day` | `Afternoon` | `Midnight` | `Night` | `Dusk` | `Dawn`

  type Weather = `Clear` | `Rain` | `Snow` | `Storm`

  type Status = `Burn` | `Freeze` | `Paralysis` | `Poison` | `Sleep` | `Confusion`

  type BattleStat = `hp` | `attack` | `defense` | `specialAttack` | `specialDefense` | `speed`

  type Type =
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

  type Nature =
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

  type EggGroup =
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

  type ExperienceGroup = `Slow` | `MediumSlow` | `MediumFast` | `Fast` | `Fluctuating` | `Erratic`

  type SpawnLocation = `UnderGround` | `Land` | `Water` | `Air` | `AirPersistent`

  type Gender = `Male` | `Female`

  interface Stat {
    name: string
    dex: number
    defaultForms: string[]
    forms: Form[]
    generation: number
  }

  interface Form {
    name: string
    experienceGroup: ExperienceGroup
    dimensions: Dimension
    moves: MoveCollection
    abilities: AbilityZip
    // movement
    // aggression
    battleStats: { [T in BattleStat]: number }
    tags: string[]
    // spawn: SpawnSet
    possibleGenders: Array<Uppercase<Gender>>
    genderProperties: GenderProperties[]
    eggGroups: EggGroup[]
    types: Type[]
    preEvolutions: string[]
    defaultBaseForm: string
    // megaItems: string[]
    // megas: string[]
    gigantamax: {
      canHaveFactor: boolean
      canGigantamax: boolean
    }
    eggCycles: number
    weight: number
    catchRate: number
    malePercentage: number
    evolutions: string[]
    evYields: { [T in BattleStat]+?: number }
  }

  interface Dimension {
    height: number
    width: number
    length: number
    eyeHeight: number
    hoverHeight: number
  }

  interface MoveCollection {
    levelUpMoves: LevelUpMove[]
    tutorMoves: string[]
    eggMoves: string[]
    tmMoves8: string[]
    tmMoves7: string[]
    tmMoves6: string[]
    tmMoves5: string[]
    tmMoves4: string[]
    tmMoves3: string[]
    tmMoves2: string[]
    tmMoves1: string[]
    tmMoves: string[]
    trMoves: string[]
    hmMoves: string[]
    transferMoves: string[]
  }

  interface LevelUpMove {
    level: number
    attacks: string[]
  }

  interface AbilityZip {
    abilities: string[]
    hiddenAbilities: string[]
  }

  interface GenderProperties {
    gender: Array<Uppercase<`all` | Gender>>
    palettes: Palette[]
  }

  interface Palette {
    name: string
    texture: string
    sprite: string
    particle: string
    // modelLocator
    // sounds
  }
}
