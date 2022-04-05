import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Wishiwashi.
 */
export const EnumWishiwashi = {
  Solo: FormBelongToSpecies.builder()
    .species(Species.Wishiwashi)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-solo`)
    .build(),

  School: FormBelongToSpecies.builder()
    .species(Species.Wishiwashi)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-school`)
    .build(),

  /**
   * Returns all forms of Wishiwashi.
   * @returns {FormBelongToSpecies[]} All forms of Wishiwashi.
   */
  values(): FormBelongToSpecies[] {
    return [EnumWishiwashi.Solo, EnumWishiwashi.School]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Solo` | `School` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `solo`:
        return EnumWishiwashi.Solo
      case `school`:
        return EnumWishiwashi.School
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
