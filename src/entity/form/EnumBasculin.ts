import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'

/**
 * Represents available forms of Basculin.
 */
export const EnumBasculin = {
  Red: FormBelongToSpecies.builder()
    .name(`Red`)
    .species(Species.Basculin)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-red`)
    .imageSuffix(`-red-striped`)
    .build(),

  Blue: FormBelongToSpecies.builder()
    .name(`Blue`)
    .species(Species.Basculin)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-blue`)
    .imageSuffix(`-blue-striped`)
    .build(),

  /**
   * Returns all forms of Basculin.
   * @returns {FormBelongToSpecies[]} All forms of Basculin.
   */
  values(): FormBelongToSpecies[] {
    return [EnumBasculin.Red, EnumBasculin.Blue]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Red` | `Blue` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `red`:
        return EnumBasculin.Red
      case `blue`:
        return EnumBasculin.Blue
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
