import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Vivillon.
 */
export const EnumVivillon = {
  Archipelago: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`archipelago`)
    .build(),

  Continental: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`continental`)
    .build(),

  Elegant: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`elegant`)
    .build(),

  Garden: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`garden`)
    .build(),

  Highplains: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`highplains`)
    .imageSuffix(`hith-plains`)
    .build(),

  Icysnow: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`icysnow`)
    .imageSuffix(`icy-snow`)
    .build(),

  Jungle: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`jungle`)
    .build(),

  Marine: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`marine`)
    .build(),

  Meadow: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`meadow`)
    .build(),

  Modern: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`modern`)
    .build(),

  Monsoon: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`monsoon`)
    .build(),

  Ocean: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`ocean`)
    .build(),

  Polar: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`polar`)
    .build(),

  River: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`river`)
    .build(),

  Sandstorm: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`sandstorm`)
    .build(),

  Savanna: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`savanna`)
    .build(),

  Sun: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`sun`)
    .build(),

  Tundra: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`tundra`)
    .build(),

  Fancy: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`fancy`)
    .build(),

  Pokeball: FormBelongToSpecies.builder()
    .species(Species.Vivillon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`pokeball`)
    .imageSuffix(`poke-ball`)
    .build(),

  /**
   * Returns all forms of Vivillon.
   * @returns {FormBelongToSpecies[]} All forms of Vivillon.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumVivillon.Archipelago,
      EnumVivillon.Continental,
      EnumVivillon.Elegant,
      EnumVivillon.Garden,
      EnumVivillon.Highplains,
      EnumVivillon.Icysnow,
      EnumVivillon.Jungle,
      EnumVivillon.Marine,
      EnumVivillon.Meadow,
      EnumVivillon.Modern,
      EnumVivillon.Monsoon,
      EnumVivillon.Ocean,
      EnumVivillon.Polar,
      EnumVivillon.River,
      EnumVivillon.Sandstorm,
      EnumVivillon.Savanna,
      EnumVivillon.Sun,
      EnumVivillon.Tundra,
      EnumVivillon.Fancy,
      EnumVivillon.Pokeball
    ]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(
    value:
      | `Archipelago`
      | `Continental`
      | `Elegant`
      | `Garden`
      | `Highplains`
      | `Icysnow`
      | `Jungle`
      | `Marine`
      | `Meadow`
      | `Modern`
      | `Monsoon`
      | `Ocean`
      | `Polar`
      | `River`
      | `Sandstorm`
      | `Savanna`
      | `Sun`
      | `Tundra`
      | `Fancy`
      | `Pokeball`
      | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `archipelago`:
        return EnumVivillon.Archipelago
      case `continental`:
        return EnumVivillon.Continental
      case `elegant`:
        return EnumVivillon.Elegant
      case `garden`:
        return EnumVivillon.Garden
      case `highplains`:
        return EnumVivillon.Highplains
      case `icysnow`:
        return EnumVivillon.Icysnow
      case `jungle`:
        return EnumVivillon.Jungle
      case `marine`:
        return EnumVivillon.Marine
      case `meadow`:
        return EnumVivillon.Meadow
      case `modern`:
        return EnumVivillon.Modern
      case `monsoon`:
        return EnumVivillon.Monsoon
      case `ocean`:
        return EnumVivillon.Ocean
      case `polar`:
        return EnumVivillon.Polar
      case `river`:
        return EnumVivillon.River
      case `sandstorm`:
        return EnumVivillon.Sandstorm
      case `savanna`:
        return EnumVivillon.Savanna
      case `sun`:
        return EnumVivillon.Sun
      case `tundra`:
        return EnumVivillon.Tundra
      case `fancy`:
        return EnumVivillon.Fancy
      case `pokeball`:
        return EnumVivillon.Pokeball
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
