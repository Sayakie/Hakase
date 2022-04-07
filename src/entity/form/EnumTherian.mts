import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Therian.
 */
export const EnumTherian = {
  Incarnate: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-incarnate`)
    .build(),

  Therian: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-therian`)
    .build(),

  /**
   * Returns all forms of Therian.
   * @returns {FormBelongToSpecies[]} All forms of Therian.
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
