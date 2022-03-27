import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Burmy.
 */
export const EnumBurmy = {
  Plant: FormBelongToSpecies.builder()
    .species(Species.Burmy)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-plant`)
    .build(),
  Sandy: FormBelongToSpecies.builder()
    .species(Species.Burmy)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-sandy`)
    .build(),
  Trash: FormBelongToSpecies.builder()
    .species(Species.Burmy)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-trash`)
    .build(),

  /**
   * Returns all forms of Burmy.
   * @returns {FormBelongToSpecies[]} All forms of Burmy.
   */
  values(): FormBelongToSpecies[] {
    return [EnumBurmy.Plant, EnumBurmy.Sandy, EnumBurmy.Trash]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Plant` | `Sandy` | `Trash` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `plant`:
        return EnumBurmy.Plant
      case `sandy`:
        return EnumBurmy.Sandy
      case `trash`:
        return EnumBurmy.Trash
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
