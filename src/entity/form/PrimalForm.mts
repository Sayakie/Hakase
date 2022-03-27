import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * A variant of primal forms.
 */
export const MegaForm = {
  Normal: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Primal: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .build(),

  /**
   * Returns all mega forms.
   * @returns {FormBelongToSpecies[]} All mega forms
   */
  values(): FormBelongToSpecies[] {
    return [MegaForm.Normal, MegaForm.Primal]
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
        return MegaForm.Normal
      case `primal`:
        return MegaForm.Primal
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
