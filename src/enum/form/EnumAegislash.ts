import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Aegislash.
 */
export const EnumAegislash = {
  Shield: FormBelongToSpecies.builder()
    .name(`Shield`)
    .species(Species.Aegislash)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-shield`)
    .build(),

  Blade: FormBelongToSpecies.builder()
    .name(`Blade`)
    .species(Species.Aegislash)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-blade`)
    .build(),

  /**
   * Returns all forms of Aegislash.
   * @returns {FormBelongToSpecies[]} All forms of Aegislash.
   */
  values(): FormBelongToSpecies[] {
    return [EnumAegislash.Shield, EnumAegislash.Blade]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Shield` | `Blade` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `shield`:
        return EnumAegislash.Shield
      case `blade`:
        return EnumAegislash.Blade
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
