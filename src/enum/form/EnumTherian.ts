import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Enamorus, Landorus, Thundurus, and Tornadus.
 */
export const EnumTherian = {
  Incarnate: FormBelongToSpecies.builder()
    .name(`Incarnate`)
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-incarnate`)
    .build(),

  Therian: FormBelongToSpecies.builder()
    .name(`Therian`)
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-therian`)
    .build(),

  /**
   * Returns all forms of Enamorus, Landorus, Thundurus, and Tornadus.
   * @returns {FormBelongToSpecies[]} All forms of Enamorus, Landorus, Thundurus, and Tornadus.
   */
  values(): FormBelongToSpecies[] {
    return [EnumTherian.Incarnate, EnumTherian.Therian]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Incarnate` | `Therian` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `incarnate`:
        return EnumTherian.Incarnate
      case `therian`:
        return EnumTherian.Therian
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
