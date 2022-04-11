import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Minior.
 */
export const EnumMinior = {
  Meteor: FormBelongToSpecies.builder()
    .name(`Meteor`)
    .species(Species.Minior)
    .form(0)
    .flags(FormFlag.AlterForm)
    .spriteSuffix(`-meteor`)
    .build(),

  Red: FormBelongToSpecies.builder()
    .name(`Red`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-red`)
    .imageSuffix(`-red-core`)
    .build(),

  Orange: FormBelongToSpecies.builder()
    .name(`Orange`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-orange`)
    .imageSuffix(`-orange-core`)
    .build(),

  Yellow: FormBelongToSpecies.builder()
    .name(`Yellow`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-yellow`)
    .imageSuffix(`-yellow-core`)
    .build(),

  Green: FormBelongToSpecies.builder()
    .name(`Green`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-green`)
    .imageSuffix(`-green-core`)
    .build(),

  Blue: FormBelongToSpecies.builder()
    .name(`Blue`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-blue`)
    .imageSuffix(`-blue-core`)
    .build(),

  Indigo: FormBelongToSpecies.builder()
    .name(`Indigo`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-indigo`)
    .imageSuffix(`-indigo-core`)
    .build(),

  Violet: FormBelongToSpecies.builder()
    .name(`Violet`)
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-violet`)
    .imageSuffix(`-violet-core`)
    .build(),

  /**
   * Returns all forms of Minior.
   * @returns {FormBelongToSpecies[]} All forms of Minior.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumMinior.Meteor,
      EnumMinior.Red,
      EnumMinior.Orange,
      EnumMinior.Yellow,
      EnumMinior.Green,
      EnumMinior.Blue,
      EnumMinior.Indigo,
      EnumMinior.Violet
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
      | `Meteor`
      | `Red`
      | `Orange`
      | `Yellow`
      | `Green`
      | `Blue`
      | `Indigo`
      | `Violet`
      | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `meteor`:
        return EnumMinior.Meteor
      case `red`:
        return EnumMinior.Red
      case `orange`:
        return EnumMinior.Orange
      case `yellow`:
        return EnumMinior.Yellow
      case `green`:
        return EnumMinior.Green
      case `blue`:
        return EnumMinior.Blue
      case `indigo`:
        return EnumMinior.Indigo
      case `violet`:
        return EnumMinior.Violet
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const