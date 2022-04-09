import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Palkia, Dialga, Giratina.
 */
export const EnumAlterTrio = {
  Altered: FormBelongToSpecies.builder()
    .name(`Altered`)
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-altered`)
    .build(),

  Origin: FormBelongToSpecies.builder()
    .name(`Origin`)
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-origin`)
    .build(),

  /**
   * Returns all forms of Palkia, Dialga.
   * @returns {FormBelongToSpecies[]} All forms of Palkia, Dialga
   */
  values(): FormBelongToSpecies[] {
    return [EnumAlterTrio.Altered, EnumAlterTrio.Origin]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Another` | `Origin` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `another`:
        return EnumAlterTrio.Altered
      case `origin`:
        return EnumAlterTrio.Origin
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
