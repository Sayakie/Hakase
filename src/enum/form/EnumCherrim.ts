import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Cherrim.
 */
export const EnumCherrim = {
  Overcast: FormBelongToSpecies.builder()
    .name(`Overcast`)
    .species(Species.Cherrim)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-overcast`)
    .build(),

  Sunshine: FormBelongToSpecies.builder()
    .name(`Sunshine`)
    .species(Species.Cherrim)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-sunshine`)
    .build(),

  /**
   * Returns all forms of Cherrim.
   * @returns {FormBelongToSpecies[]} All forms of Cherrim.
   */
  values(): FormBelongToSpecies[] {
    return [EnumCherrim.Overcast, EnumCherrim.Sunshine]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Overcast` | `Sunshine` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `overcast`:
        return EnumCherrim.Overcast
      case `sunshine`:
        return EnumCherrim.Sunshine
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
