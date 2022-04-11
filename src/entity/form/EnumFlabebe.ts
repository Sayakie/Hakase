import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'

/**
 * Represents available forms of Flabebe.
 */
export const EnumFlabebe = {
  Red: FormBelongToSpecies.builder()
    .name(`Red`)
    .species(Species.Flabebe)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-red`)
    .build(),

  Yellow: FormBelongToSpecies.builder()
    .name(`Yellow`)
    .species(Species.Flabebe)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-yellow`)
    .build(),

  Orange: FormBelongToSpecies.builder()
    .name(`Orange`)
    .species(Species.Flabebe)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-orange`)
    .build(),

  Blue: FormBelongToSpecies.builder()
    .name(`Blue`)
    .species(Species.Flabebe)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-blue`)
    .build(),

  White: FormBelongToSpecies.builder()
    .name(`White`)
    .species(Species.Flabebe)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-white`)
    .build(),

  AZ: FormBelongToSpecies.builder()
    .name(`AZ`)
    .species(Species.Flabebe)
    .form(5)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-az`)
    .imageSuffix(`-eternal`)
    .build(),

  /**
   * Returns all forms of Flabebe.
   * @returns {FormBelongToSpecies[]} All forms of Flabebe.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumFlabebe.Red,
      EnumFlabebe.Yellow,
      EnumFlabebe.Orange,
      EnumFlabebe.Blue,
      EnumFlabebe.White,
      EnumFlabebe.AZ
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
    value: `Red` | `Yellow` | `Orange` | `Blue` | `White` | `AZ` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `red`:
        return EnumFlabebe.Red
      case `yellow`:
        return EnumFlabebe.Yellow
      case `orange`:
        return EnumFlabebe.Orange
      case `blue`:
        return EnumFlabebe.Blue
      case `white`:
        return EnumFlabebe.White
      case `az`:
        return EnumFlabebe.AZ
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
