import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Shaymin.
 */
export const EnumShaymin = {
  Land: FormBelongToSpecies.builder()
    .species(Species.Shaymin)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-land`)
    .build(),

  Sky: FormBelongToSpecies.builder()
    .species(Species.Shaymin)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-sky`)
    .build(),

  /**
   * Returns all forms of Shaymin.
   * @returns {FormBelongToSpecies[]} All forms of Shaymin.
   */
  values(): FormBelongToSpecies[] {
    return [EnumShaymin.Land, EnumShaymin.Sky]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Land` | `Sky` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `land`:
        return EnumShaymin.Land
      case `sky`:
        return EnumShaymin.Sky
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
