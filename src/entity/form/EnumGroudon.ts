import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Groudon.
 */
export const EnumGroudon = {
  Meta: FormBelongToSpecies.builder()
    .name(`Meta`)
    .species(Species.Groudon)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .build(),

  /**
   * Returns all forms of Groudon.
   * @returns {FormBelongToSpecies[]} All forms of Groudon.
   */
  values(): FormBelongToSpecies[] {
    return [EnumGroudon.Meta]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Meta` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `meta`:
        return EnumGroudon.Meta
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
