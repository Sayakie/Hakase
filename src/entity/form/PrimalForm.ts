import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * A variant of primal forms.
 */
export const PrimalForm = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Primal: FormBelongToSpecies.builder()
    .name(`Primal`)
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .build(),

  /**
   * Returns all mega forms.
   * @returns {FormBelongToSpecies[]} All mega forms
   */
  values(): FormBelongToSpecies[] {
    return [PrimalForm.Normal, PrimalForm.Primal]
  },

  /**
   * Returns the form with the given name that is a member of this enumeration.
   *
   * @param {string} value The name of the form to return
   * @returns {FormBelongToSpecies} The form with the given name
   * @throws {IllegalArgumentException} If the given name is not a member of this enum
   */
  valueOf(value: `Normal` | `Primal` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return PrimalForm.Normal
      case `primal`:
        return PrimalForm.Primal
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
