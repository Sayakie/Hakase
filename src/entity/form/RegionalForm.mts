import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * A variant of regional forms.
 */
export const RegionalForm = {
  Normal: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Alolan: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlolanForm, FormFlag.DisplayFormName)
    .build(),

  Galarian: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(2)
    .flags(FormFlag.GalarianForm, FormFlag.DisplayFormName)
    .build(),

  Hisuian: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(3)
    .flags(FormFlag.HisuianForm, FormFlag.DisplayFormName)
    .build(),

  /**
   * Returns all regional forms.
   * @returns {FormBelongToSpecies[]} All regional forms.
   */
  values(): FormBelongToSpecies[] {
    return [
      RegionalForm.Normal,
      RegionalForm.Alolan,
      RegionalForm.Galarian,
      RegionalForm.Hisuian
    ]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(
    value: `Normal` | `Alolan` | `Galarian` | `Hisuian` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return RegionalForm.Normal
      case `alolan`:
        return RegionalForm.Alolan
      case `galarian`:
        return RegionalForm.Galarian
      case `hisuian`:
        return RegionalForm.Hisuian
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
