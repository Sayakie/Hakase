import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * A gender forms.
 */
export const GenderForm = {
  Male: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.GenderForm)
    .build(),

  Female: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.GenderForm)
    .build(),

  None: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(2)
    .flags(FormFlag.GenderlessForm)
    .build(),

  /**
   * Returns all gender forms.
   * @returns {FormBelongToSpecies[]} All gender forms
   */
  values(): FormBelongToSpecies[] {
    return [GenderForm.Male, GenderForm.Female, GenderForm.None]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Male` | `Female` | `None` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `male`:
        return GenderForm.Male
      case `female`:
        return GenderForm.Female
      case `none`:
        return GenderForm.None
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
