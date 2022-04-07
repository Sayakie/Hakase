import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Minior.
 */
export const EnumMinior = {
  Meteor: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(0)
    .flags(FormFlag.AlterForm)
    .spriteSuffix(`-meteor`)
    .build(),

  Red: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-red`)
    .imageSuffix(`-red-core`)
    .build(),

  Orange: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-orange`)
    .imageSuffix(`-orange-core`)
    .build(),

  Yellow: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-yellow`)
    .imageSuffix(`-yellow-core`)
    .build(),

  Green: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-green`)
    .imageSuffix(`-green-core`)
    .build(),

  Blue: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-blue`)
    .imageSuffix(`-blue-core`)
    .build(),

  Indigo: FormBelongToSpecies.builder()
    .species(Species.Minior)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-indigo`)
    .imageSuffix(`-indigo-core`)
    .build(),

  Violet: FormBelongToSpecies.builder()
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
