import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * A variant of mega forms.
 */
export const MegaForm = {
  Normal: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Mega: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.MegaForm, FormFlag.DisplayFormName)
    .build(),

  MegaX: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.MegaForm, FormFlag.DisplayFormName)
    .build(),

  MegaY: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(2)
    .flags(FormFlag.MegaForm, FormFlag.DisplayFormName)
    .build(),

  /**
   * Returns all mega forms.
   * @returns {FormBelongToSpecies[]} All mega forms
   */
  values(): FormBelongToSpecies[] {
    return [MegaForm.Normal, MegaForm.Mega, MegaForm.MegaX, MegaForm.MegaY]
  },

  /**
   * Returns the form with the given name that is a member of this enumeration.
   *
   * @param {string} value The name of the form to return
   * @returns {FormBelongToSpecies} The form with the given name
   * @throws {IllegalArgumentException} If the given name is not a member of this enum
   */
  valueOf(
    value: Capitalize<`normal` | `mega` | `mega-x` | `mega-y`>
  ): FormBelongToSpecies {
    switch (value.toLowerCase()) {
      case `normal`:
        return MegaForm.Normal
      case `mega`:
        return MegaForm.Mega
      case `megax`:
      case `mega-x`:
        return MegaForm.MegaX
      case `megay`:
      case `mega-y`:
        return MegaForm.MegaY
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
