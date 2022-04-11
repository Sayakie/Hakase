import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Magearna.
 */
export const EnumMagearna = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Magearna)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Original: FormBelongToSpecies.builder()
    .name(`Original`)
    .species(Species.Magearna)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-o`)
    .imageSuffix(`-original`)
    .build(),

  /**
   * Returns all forms of Magearna.
   * @returns {FormBelongToSpecies[]} All forms of Magearna.
   */
  values(): FormBelongToSpecies[] {
    return [EnumMagearna.Normal, EnumMagearna.Original]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Normal` | `Original`): FormBelongToSpecies {
    switch (value.toLowerCase()) {
      case `normal`:
        return EnumMagearna.Normal
      case `original`:
        return EnumMagearna.Original
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
