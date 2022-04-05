import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Gastrodon.
 */
export const EnumGastrodon = {
  East: FormBelongToSpecies.builder()
    .species(Species.Gastrodon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-east`)
    .build(),

  West: FormBelongToSpecies.builder()
    .species(Species.Gastrodon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-west`)
    .build(),

  /**
   * Returns all forms of Gastrodon.
   * @returns {FormBelongToSpecies[]} All forms of Gastrodon.
   */
  values(): FormBelongToSpecies[] {
    return [EnumGastrodon.East, EnumGastrodon.West]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `East` | `West` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `east`:
        return EnumGastrodon.East
      case `west`:
        return EnumGastrodon.West
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
