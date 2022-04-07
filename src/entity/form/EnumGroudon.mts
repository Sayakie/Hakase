import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Groudon.
 */
export const EnumGroudon = {
  Meta: FormBelongToSpecies.builder()
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
